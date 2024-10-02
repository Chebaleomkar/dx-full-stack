import Link from "next/link";

export const TermsAndPrivacy = () => (
    <p className="mt-6 text-gray-500 text-center text-sm">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline text-blue-500 hover:text-blue-700">
            Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline text-blue-500 hover:text-blue-700">
            Privacy Policy
        </Link>
        .
    </p>
);