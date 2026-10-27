# Overall Greatness platform — first interactive prototype

Open `dist/portal.html` through the local website preview. The marketing site links to it.

This version demonstrates parent, Femi, Prince and admin workflows using sample records in memory. Reloading resets the records. The role switcher is a preview control, not authentication. Do not enter real client or child information.

## Implemented workflow

- Add sample player profiles (name, age and development goal only).
- Request a £25 single session or £100 four-session package, with no automatic renewal.
- Keep purchases pending until sample bank payment is verified in the admin view.
- Reserve one verified credit for each requested or confirmed booking.
- Block one-hour sessions overlapping the shared weekly exclusions for Femi and Prince.
- Maintain independent coach bookings; prevent coach and player overlaps.
- Confirm or cancel sessions, record attendance, and deduct a credit once per attended session.
- Release reservations for cancellations and non-attendance.
- Record private coaching notes and explicitly parent-shared progress summaries.

## Availability

Europe/London wall-clock times, recurring weekly:

- Monday unavailable 15:30–17:00.
- Tuesday unavailable 15:45–17:15.
- Thursday unavailable 12:15–13:15 and 15:30–16:30.
- Wednesday has no supplied exclusions.
- Femi and Prince share these rules but have independent appointments.
- Unblocked times are requestable, not guaranteed opening hours.

## Required before serving real clients

1. Hosted authentication and server-enforced parent, coach and admin permissions. Parents must only access their own children; coaches must only access assigned bookings and players.
2. Durable server database with transaction-safe booking reservations and credit ledger. Atomic conflict checks must prevent simultaneous requests from double-booking a coach or overspending credits. Attendance and payment operations need idempotency and an audit trail.
3. Approved business bank details and payment references; admins manually reconcile bank transactions before issuing credits. Never accept a client-side claim as proof of payment.
4. Confirmed opening hours, exact venues, booking horizon, package expiry and cancellation/no-show policy. The demo does not deduct credits for a missed session; this is a provisional rule for review.
5. Transactional email delivery for confirmations, cancellations and scheduled reminders, with failure handling. No portal emails are sent in this prototype.
6. Privacy notice, retention rules and appropriate access controls for children's information. No medical or safeguarding details belong in the general form.
7. Production deployment, backups and browser/mobile verification of the hosted system.

The existing website email enquiry flow remains usable and separate from this demonstration.
