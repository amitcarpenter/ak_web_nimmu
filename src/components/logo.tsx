import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/images/logo/new_ak_logo.png"
        width={200}
        height={70}
        alt="ATLA KNOTS EVENTIVE"
        className="h-16 w-auto"
        priority
      />
    </div>
  );
}
