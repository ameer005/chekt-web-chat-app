import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Cropper from "react-easy-crop";

import { IoClose } from "react-icons/io5";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { AiOutlineCheck } from "react-icons/ai";
import getCroppedImg from "../../utils/cropImage";

const CropModal = ({ setShowCropModal, image, mutate }) => {
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedAre, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        URL.createObjectURL(image),
        croppedAreaPixels
      );
      return croppedImage;
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const submitForm = async () => {
    const croppedImage = await showCroppedImage();
    const formData = new FormData();
    formData.append("picture", croppedImage);
    mutate(formData);
    setShowCropModal(false);
  };

  return createPortal(
    <div
      onClick={() => setShowCropModal(false)}
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black/30 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-colorWhite relative w-full max-w-[30rem] md:mx-3"
      >
        <div className="px-4 py-2">
          <IoClose
            onClick={() => setShowCropModal(false)}
            className="h-6 w-6"
          />
        </div>

        <div className="relative h-[25rem] sm:h-[20rem]">
          <Cropper
            aspect={5 / 5}
            minZoom={1}
            crop={crop}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            cropShape={"round"}
            image={URL.createObjectURL(image)}
            onCropComplete={onCropComplete}
            zoom={zoom}
          />

          <div className="bg-colorBg absolute top-[50%] right-3 flex -translate-y-[50%] flex-col text-base  text-black">
            <button
              onClick={() => setZoom((prev) => prev + 0.5)}
              className="flex justify-center px-2 py-2"
            >
              <CgMathPlus className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                setZoom((prev) => {
                  if (prev > 1) {
                    return prev - 0.5;
                  }
                  return prev;
                })
              }
              className="flex justify-center px-2 py-2"
            >
              <CgMathMinus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <button
          onClick={submitForm}
          className="bg-colorPrimary absolute bottom-0 right-5 flex h-[4rem] w-[4rem] translate-y-[50%] items-center justify-center rounded-full text-white"
        >
          <AiOutlineCheck className="h-8 w-8" />
        </button>
      </div>
    </div>,
    document.getElementById("crop-modal")
  );
};

export default CropModal;
