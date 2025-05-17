const supabase = require('../supabase/supabaseClient');
const uploadToSupabase = async (file, bucketName) => {
  try {
    const filePath = `${Date.now()}-${file.originalname}`; // Save directly to root

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error('❌ Upload Error:', error.message);
      return null;
    }

    const { data: urlData, error: urlError } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('❌ URL Error:', urlError.message);
      return null;
    }

    console.log('✅ Uploaded to Supabase:', urlData.publicUrl);
    return urlData.publicUrl;

  } catch (err) {
    console.error('❌ Unexpected Error:', err.message);
    return null;
  }
};

module.exports = uploadToSupabase;
