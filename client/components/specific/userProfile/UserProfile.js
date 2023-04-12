import { useState, useEffect } from "react";
import Avatar from "@/components/ui/avatar/Avatar";
import useStore from "@/store/useStore";
import { useChangePicture } from "@/hooks/queries/useUser";

import CropModal from "@/components/modals/CropModal";

import { MdEdit } from "react-icons/md";
import LoadingCircle from "@/components/ui/LoadingSpinners/LoadingCircle";
const UserProfile = () => {
  const user = useStore((state) => state.user);
  const [showCropModal, setShowCropModal] = useState(false);
  const [image, setImage] = useState(null);
  const { mutate, isLoading } = useChangePicture();

  useEffect(() => {
    if (image) {
      setShowCropModal(true);
    }
  }, [image]);

  // dfdf
  return (
    <div className="mt-6 h-full ">
      <div className="relative flex h-[12rem] justify-center">
        <div className="absolute ">
          <Avatar size="h-[12rem] w-[12rem]" img={user?.picture} />
          <label className="ut-animation absolute top-0 left-0 z-10 flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/0 text-transparent hover:bg-black/40 hover:text-white">
            <MdEdit className="h-8 w-8 " />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
            />
          </label>
          {isLoading && (
            <div className="absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%]">
              <LoadingCircle />
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 flex justify-center">
        <div className="text-2xl font-medium">{user.name}</div>
      </div>

      {showCropModal && (
        <CropModal
          image={image}
          setShowCropModal={setShowCropModal}
          mutate={mutate}
        />
      )}
    </div>
  );
};

export default UserProfile;
