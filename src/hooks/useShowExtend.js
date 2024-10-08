import { useEffect } from "react";
import useCurrentPath from "./useCurrentPath";
import useSeletectUserStore from "../store/useSeletedUserStore";
import useShowExtendStore from "../store/useShowExtendStore";
import { useLocation } from "react-router-dom";

function useShowExtend() {
  const currentPath = useCurrentPath();
  const location = useLocation();
  const selectedUser = useSeletectUserStore((state) => state.seletedUser);
  const showExtend = useShowExtendStore((state) => state.showExtend);
  const setShowExtend = useShowExtendStore((state) => state.setShowExtend);

  useEffect(() => {
    if (
      currentPath === 'chatstu' || 
      currentPath === 'file' || 
      currentPath == 'writing' ||
      (currentPath === 'manage' && selectedUser.selected && !(location.pathname.split('/')[2]))
    ) {
      setShowExtend(true);
    } else {
      setShowExtend(false);
    }
  }, [currentPath, selectedUser, location])

  return showExtend;
}

export default useShowExtend;