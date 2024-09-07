export const isWithin48Hours = (issuedAt: string) => {
  if (!issuedAt) {
    console.error("issuedAt is undefined or null", issuedAt);
    return false;
  }

  const issuedDate = new Date(issuedAt);
  if (isNaN(issuedDate.getTime())) {
    console.error("issuedAt is not a valid date", issuedAt);
    return false;
  }

  const now = new Date();
  const differenceInHours =
    (now.getTime() - issuedDate.getTime()) / (1000 * 60 * 60);

  return differenceInHours <= 48;
};
