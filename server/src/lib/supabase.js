const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://tuiwzznryqqjdmexyiwy.supabase.co",
  process.env.SUPABASE_KEY
);

/**
 * Uploads a file to Supabase Storage Bucket and returns the public URL.
 * @param {import('mongoose').Types.ObjectId} postId
 * @param {Buffer} fileBuffer
 * @param {string} ext
 * @returns {Promise<string | null>}
 */
module.exports.uploadFile = async (postId, file) => {
  try {
    const ext = path.extname(file.originalname);
    const fileName = `${postId}${ext}`; // Ensure proper file extension format

    // Upload file from buffer
    const { _, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: `image/${ext.replace(".", "")}`, // Ensure correct MIME type
      });

    if (error) {
      console.log("Supabase Upload Error:", error);
      return null;
    }

    // Retrieve public file URL
    const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);
    return data.publicUrl;
  } catch (err) {
    console.error("File Upload Error:", err);
    return null;
  }
};

/**
 *  Replaces an existing file in Supabase Storage Bucket and returns the public URL.
 * @param {import('mongoose').Types.ObjectId} postId
 * @param {Buffer} fileBuffer
 * @param {string} ext
 * @returns {Promise<string | null>}
 */
module.exports.replaceFile = async (postId, file) => {
  try {
    console.log(file);
    const ext = path.extname(file.originalname);
    const fileName = `${postId}${ext}`;

    // Delete existing file
    // const { error: deleteError } = await supabase.storage
    //   .from("uploads")
    //   .remove([fileName]);

    // Upload file from buffer
    const { _, error } = await supabase.storage
      .from("uploads")
      .update(fileName, file.buffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: `image/${ext.replace(".", "")}`,
      });

    console.log(_);

    if (error) {
      console.log("Supabase Upload Error:", error);
      return null;
    }

    // Retrieve public file URL
    const { data } = supabase.storage.from("uploads").getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.error("File Upload Error:", err);
    return null;
  }
};

/**
 *
 * @param {import('mongoose').Types.ObjectId} postId
 * @param {Buffer} fileBuffer
 * @param {string} ext
 * @returns {Promise<boolean>}
 */
module.exports.deleteFile = async (postId, ext) => {
  try {
    const fileName = `${postId}${ext}`;

    // Delete file from Supabase Storage
    const { error } = await supabase.storage.from("uploads").remove([fileName]);

    if (error) {
      console.log("Supabase Delete Error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("File Delete Error:", err);
    return false;
  }
};
