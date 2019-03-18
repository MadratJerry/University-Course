package pers.tam.flea.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import pers.tam.flea.entities.Image;
import pers.tam.flea.repositories.ImageRepository;
import pers.tam.flea.services.ImageService;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService;
    private final ImageRepository imageRepository;

    public ImageController(ImageService imageService, ImageRepository imageRepository) {
        this.imageService = imageService;
        this.imageRepository = imageRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<Image> uploadImage(@RequestParam(value = "file") MultipartFile file) {
        if (file.isEmpty())
            return ResponseEntity.badRequest().body(null);
        String fileName = file.getOriginalFilename() != null ? file.getOriginalFilename() : "";
        try {
            String md5 = imageService.md5(file.getInputStream());
            String destFileName = md5 + fileName.substring(fileName.lastIndexOf("."));
            Image image = imageRepository.findByUrl(destFileName);
            if (image != null) return ResponseEntity.ok().body(imageRepository.save(image));
            File dir = new File("static/images");
            if (!dir.exists()) dir.mkdirs();
            File dest = new File(dir.getAbsolutePath() + "/" + destFileName);
            file.transferTo(dest);
            image = new Image();
            image.setUrl(destFileName);
            return ResponseEntity.ok().body(imageRepository.save(image));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
}
