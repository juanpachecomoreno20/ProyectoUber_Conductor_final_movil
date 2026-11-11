import { PRICING } from '../config/pricing';

export function calculateFare({
  distanceKm,
  durationMin,
  category,
  tip = 0,
}) {
  const safeDistance = Number(distanceKm) || 0;
  const safeDuration = Number(durationMin) || 0;
  const safeTip = Number(tip) || 0;

  const normalizedCategory = String(category || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .toUpperCase();

  const multiplier =
    PRICING.MULTIPLIERS[
      normalizedCategory
    ] ||
    PRICING.MULTIPLIERS.ECONOMY ||
    1;

  const subtotal =
    PRICING.BASE_FARE +
    safeDistance * PRICING.PRICE_PER_KM +
    safeDuration * PRICING.PRICE_PER_MINUTE;

  let fare = subtotal * multiplier;
  fare = Math.round(fare / 100) * 100;
  fare = Math.max(fare, PRICING.MINIMUM_FARE);

  const commission = Math.round(
    fare * PRICING.COMMISSION_RATE
  );

  const driverEarnings = fare - commission + safeTip;

  return {
    fare,
    commission,
    driverEarnings,
    tip: safeTip,
    commissionRate: PRICING.COMMISSION_RATE,
  };
}