package com.qunhe.blog.util;

import com.qunhe.blog.vo.UploadParams;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.StringUtils;
import org.glassfish.jersey.media.multipart.BodyPartEntity;
import org.springframework.util.DigestUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Calendar;

public abstract class BlogUtil {

	public static void saveToDisk(UploadParams upload, String path, String urlPath) throws IOException {
		path = path.endsWith("/") ? path : path + "/";
		String rawFilename = upload.getBody().getFormDataContentDisposition().getFileName();
		rawFilename = new String(rawFilename.getBytes("iso-8859-1"), "utf-8");
		File file = new File(FileUtils.getTempDirectoryPath() + Calendar.getInstance().getTimeInMillis() + ".tmp");
		upload.getBody().getEntityAs(BodyPartEntity.class).moveTo(file);
		upload.getModel().setSize(FileUtils.sizeOf(file));
		String md5 = DigestUtils.md5DigestAsHex(FileUtils.openInputStream(file));
		String filename = md5 + "."
				+ FilenameUtils.getExtension(upload.getBody().getFormDataContentDisposition().getFileName());
        if(StringUtils.endsWith(filename, ".")){
            filename = filename + "jpeg";
        }
		upload.getModel().setFilePath(path + filename);
		upload.getModel().setUrl(urlPath + filename);
		upload.getModel().setFileName(rawFilename);
		upload.getModel().setContentType(upload.getBody().getMediaType().toString());
		File f = new File(upload.getModel().getFilePath());
		if (!(f.exists() && DigestUtils.md5DigestAsHex(new FileInputStream(f)).equals(md5))) {
            FileUtils.copyFile(file, f);
		}
	}

}
