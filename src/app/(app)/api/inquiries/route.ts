import configPromise from '@payload-config'
import { getPayload } from 'payload'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const allowedServices = new Set(['editing', 'proofreading', 'beta-reading', 'author-va'])
const maxBodyBytes = 16_000

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin')
    if (origin && new URL(origin).origin !== new URL(request.url).origin) {
      return Response.json({ message: 'Request could not be verified.' }, { status: 403 })
    }

    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > maxBodyBytes) {
      return Response.json({ message: 'The request is too large.' }, { status: 413 })
    }

    const body = await request.json()
    if (typeof body.website === 'string' && body.website.trim()) {
      return Response.json({ message: 'Thank you. Your inquiry has been received.' })
    }

    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 160) : ''
    const email =
      typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 254) : ''
    const genre = typeof body.genre === 'string' ? body.genre.trim().slice(0, 160) : ''
    const projectGoals =
      typeof body.projectGoals === 'string' ? body.projectGoals.trim().slice(0, 5000) : ''
    const servicesRequested = Array.isArray(body.servicesRequested)
      ? body.servicesRequested.filter(
          (service: unknown): service is string =>
            typeof service === 'string' && allowedServices.has(service),
        )
      : []
    const manuscriptStatus = typeof body.manuscriptStatus === 'string' ? body.manuscriptStatus : ''
    const allowedStatuses = new Set([
      'planning',
      'drafting',
      'complete',
      'published',
      'not-applicable',
    ])

    if (
      !name ||
      !emailPattern.test(email) ||
      !genre ||
      !projectGoals ||
      !servicesRequested.length ||
      !allowedStatuses.has(manuscriptStatus) ||
      body.privacyAcknowledged !== true
    ) {
      return Response.json(
        { message: 'Please complete the required fields and confirm the privacy notice.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config: configPromise })
    await payload.create({
      collection: 'service-inquiries',
      data: {
        name,
        email,
        genre,
        projectGoals,
        servicesRequested: servicesRequested.map((service: string) => ({ service })),
        manuscriptStatus,
        ...(Number.isFinite(Number(body.wordCount)) && Number(body.wordCount) > 0
          ? { wordCount: Math.min(Number(body.wordCount), 2_000_000) }
          : {}),
        ...(typeof body.desiredDeadline === 'string' && body.desiredDeadline
          ? { desiredDeadline: body.desiredDeadline }
          : {}),
        privacyAcknowledged: true,
        status: 'new',
      },
      overrideAccess: true,
    })

    return Response.json({ message: 'Your inquiry has been received.' }, { status: 201 })
  } catch (error) {
    console.error('Service inquiry submission failed', error)
    return Response.json(
      { message: 'We could not submit your inquiry right now. Please try again shortly.' },
      { status: 500 },
    )
  }
}
