import { Fragment, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import axios from "axios";

const fileTypes = ["PNG", "JPG", "JPEG"];

export const FileUpload = () => {
  const [lowResPhoto, setLowResPhoto] = useState<File | null>(null);

  const [highResPhoto, setHighResPhoto] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    if (lowResPhoto) {
      setLoading(true);

      try {
        const formData = new FormData();

        formData.append("photo", lowResPhoto);

        const { data } = await axios({
          url: "/api/upload",
          method: "POST",
          data: formData,
          responseType: "blob",
        });

        setHighResPhoto(data);
      } catch (error) {
        toast.error("File size is too large. Please try smaller image.", {
          position: "top-center",
        });

        setLowResPhoto(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (file: File) => {
    setLowResPhoto(file);
  };

  const handleDownload = () => {
    if (highResPhoto) {
      const link = document.createElement("a");

      const href = URL.createObjectURL(highResPhoto);

      link.href = href;

      link.setAttribute("download", "upscaled.png");

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(href);

      setLowResPhoto(null);

      setHighResPhoto(null);
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        <FileUploader
          name="photo"
          disabled={loading}
          required
          handleChange={handleChange}
          types={fileTypes}
        />
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg border disabled:cursor-not-allowed disabled:opacity-45 dark:border-white transition active:scale-95 ${
              lowResPhoto ? "visible" : "invisible"
            }`}
          >
            Upscale!
          </button>
          {highResPhoto && (
            <button
              type="button"
              disabled={loading}
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg border disabled:cursor-not-allowed disabled:opacity-45 dark:border-white transition active:scale-95"
            >
              Download!
            </button>
          )}
        </div>
      </form>
      {
        <div
          className={`my-8 flex flex-col items-center ${
            loading ? "visible" : "invisible"
          }`}
        >
          <p className="mb-4">Multiplying matrices, please hold...</p>
          <ClipLoader size={32} color="#3B82F6" />
        </div>
      }
    </Fragment>
  );
};
