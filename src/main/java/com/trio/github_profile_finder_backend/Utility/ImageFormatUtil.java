package com.trio.github_profile_finder_backend.Utility;

import java.util.Arrays;

public class ImageFormatUtil {

    public static String getImageFormat(byte[] imageData) {
        if (imageData.length < 8) {
            return null;
        }

        // JPEG
        if (imageData[0] == (byte) 0xFF && imageData[1] == (byte) 0xD8) {
            return "image/jpeg";
        }

        // PNG
        if (imageData[0] == (byte) 0x89 && imageData[1] == (byte) 0x50 && imageData[2] == (byte) 0x4E &&
                imageData[3] == (byte) 0x47 && imageData[4] == (byte) 0x0D && imageData[5] == (byte) 0x0A &&
                imageData[6] == (byte) 0x1A && imageData[7] == (byte) 0x0A) {
            return "image/png";
        }

        // GIF
        if (imageData[0] == 'G' && imageData[1] == 'I' && imageData[2] == 'F') {
            return "image/gif";
        }

        // Add more formats if needed

        return null;
    }
}
