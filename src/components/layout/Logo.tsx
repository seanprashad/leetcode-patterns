export default function Logo() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/logo-light.png`}
        alt="Leetcode Patterns"
        className="h-8 dark:hidden sm:h-10"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}/images/logo-dark.png`}
        alt="Leetcode Patterns"
        className="hidden h-8 dark:block sm:h-10"
      />
    </>
  );
}
