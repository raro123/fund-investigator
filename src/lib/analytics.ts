/**
 * PostHog funnel events (log #62).
 *
 * Elements opt in with data attributes instead of inline scripts:
 * `data-track` names the event, `data-placement` and `data-channel` become its
 * properties. One delegated listener in Layout.astro sends them, so pages stay
 * free of analytics code. Booking clicks need this most: Zoho takes no `ref`,
 * so the click event is the only record of which button was used.
 */

export type TrackEvent =
  | 'review_booking_click'
  | 'conversation_request'
  | 'deepdive_click'
  | 'subscribe_click';

/** Page-view events sent once on load, set through Layout's `trackView` prop. */
export type TrackView = 'invest_view';

/**
 * Data attributes for a tracked element.
 *
 * @param event - Event name sent to PostHog.
 * @param placement - Where the element sits, e.g. `invest_hero`.
 * @param channel - Contact channel for `conversation_request` (e.g. `whatsapp`).
 * @returns Attributes to spread onto the element.
 */
export function trackAttrs(event: TrackEvent, placement: string, channel?: string) {
  return {
    'data-track': event,
    'data-placement': placement,
    ...(channel ? { 'data-channel': channel } : {}),
  };
}
