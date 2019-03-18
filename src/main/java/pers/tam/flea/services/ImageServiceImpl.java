package pers.tam.flea.services;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
public class ImageServiceImpl implements ImageService {

    @Override
    public String md5(InputStream in) {

        byte[] buffer = new byte[8192];
        try {
            MessageDigest digest = MessageDigest.getInstance("MD5");
            int length;
            while ((length = in.read(buffer)) != -1) {
                digest.update(buffer, 0, length);
            }
            BigInteger bigInteger = new BigInteger(1, digest.digest());
            return bigInteger.toString(16);
        } catch (IOException | NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
