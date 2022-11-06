import React, { useState } from "react";
import styles from "./rm_image_input.module.scss";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { FileUploadObject } from "../../../shared/interfaces/page.interface";

type RMImageInputProps = {
  value: FileUploadObject;
  onChange: (arg1: FileUploadObject) => void;
};

const RMImageInput: React.FC<RMImageInputProps> = ({ value, onChange }) => {
  const [hoveringPreview, setHoveringPreview] = useState(false);

  const handleBrowseEvent = (e) => {
    stopReload(e);
    handleFileUpload(e);
  };

  const stopReload = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEvent = (e) => {
    handleFileUpload(e);
  };

  const handleFileUpload = (e) => {
    stopReload(e);
    e.preventDefault();
    try {
      let file: File = e?.dataTransfer?.files[0]
        ? e.dataTransfer.files[0]
        : e.target.files[0];

      if (file.size > 10e6) {
        alert("File too large :(");
      }

      let reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          file,
          raw: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } catch {
      alert("Error uploading files!");
    }
  };

  const handleDeleteUploadedImage = () => {
    onChange({
      file: undefined,
      value: undefined,
    });
  };
  return (
    <div className={styles.image_input_container}>
      <div
        className={styles.image_preview_container}
        onMouseEnter={() => setHoveringPreview(true)}
        onMouseLeave={() => setHoveringPreview(false)}
      >
        <Image
          src={value.raw ? value.raw : "/placeholder.jpg"}
          layout="fill"
          objectFit="cover"
          className={styles.image_preview}
          alt="Preview Image"
        />
        {hoveringPreview && (
          <div className={styles.hover_overlay_container}>
            <DeleteIcon
              onClick={handleDeleteUploadedImage}
              color="secondary"
              style={{
                width: "64px",
                height: "64px",
              }}
            />
          </div>
        )}
      </div>
      <div
        onDragOver={stopReload}
        onDrop={handleDragEvent}
        onClick={handleFileUpload}
        className={styles.upload_file_container}
      >
        Drop file or{" "}
        <button type="button">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleBrowseEvent(e)}
          />
          Choose File
        </button>
      </div>
    </div>
  );
};

export default RMImageInput;
