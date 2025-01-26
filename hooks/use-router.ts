import { useRouter as useToploaderRouter } from "nextjs-toploader/app";
import { useRouter as useDefaultRouter } from "next/navigation";

export const useRouter = ({
  topLoader = true,
}: { topLoader?: boolean } = {}) => {
  const nextRouter = useDefaultRouter();
  const toploaderRouter = useToploaderRouter();

  // Return nextRouter immediately if animation is false
  if (!topLoader) {
    return nextRouter;
  }

  // Return appropriate router based on device capabilities and animation enabled
  return toploaderRouter;
};
