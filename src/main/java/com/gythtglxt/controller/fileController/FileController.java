package com.gythtglxt.controller.fileController;

import com.github.tobato.fastdfs.domain.fdfs.StorePath;
import com.github.tobato.fastdfs.service.FastFileStorageClient;
import com.gythtglxt.dataobject.FileDO;
import com.gythtglxt.dto.FileDto;
import com.gythtglxt.error.EmBusinessError;
import com.gythtglxt.response.ResponseData;
import com.gythtglxt.service.IFileService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/4 16:37
 */
@RestController
@RequestMapping("/file")
public class FileController {
    @Resource
    private IFileService fileService;
    @Resource
    private FastFileStorageClient fastFileStorageClient;
    @Value("${fdfs.tracker-list}")
    private String nginx;
    @Value("${fdfs.http_tracker_http_port}")
    private String port;

    @PostMapping("/upload")
    @ResponseBody
    public ResponseData upload(FileDto fileDto) throws IOException {
        fileService.uploadFile(saveFile(fileDto));
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping("/delete")
    @ResponseBody
    public ResponseData delete(String dataCode){
        List<FileDO> fileDOList = fileService.selectMultipleFileByDataCode(dataCode);
        String filePath = null;
        for (FileDO fileDO : fileDOList){
            filePath = fileDO.getFilePath();
            try {
                fastFileStorageClient.deleteFile(filePath.substring(0, filePath.indexOf("?")));//去除掉后面的fileName属性
            }catch (Exception e){
                fastFileStorageClient.deleteFile(filePath);
            }
        }
        fileService.deleteFileByDataCode(dataCode);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping("/get/{datacode}")
    @ResponseBody
    public ResponseData get(@PathVariable String datacode){
        return new ResponseData(EmBusinessError.success,fileService.selectFileByDataCode(datacode));
    }

    @PostMapping("/upload-multi")
    @ResponseBody
    public ResponseData upload_multi(FileDto fileDto){
        fileService.addFile(saveFile(fileDto));
        return new ResponseData(EmBusinessError.success);
    }

    private FileDO saveFile(FileDto fileDto) {
        FileDO fileDO = new FileDO();
        BeanUtils.copyProperties(fileDto,fileDO);
        /*从数据传输对象中拿到文件*/
        MultipartFile multipartFile = fileDto.getFile();
        StorePath storePath = null;
        try {
            storePath = fastFileStorageClient.uploadFile(
                    multipartFile.getInputStream(),
                    multipartFile.getSize(),
                    FilenameUtils.getExtension(multipartFile.getOriginalFilename()),
                    null);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String fileName = multipartFile.getOriginalFilename();
        fileDO.setFileName(fileName);
        fileDO.setFileType(FilenameUtils.getExtension(fileName));//文件扩展名
        fileDO.setFileSize((double) multipartFile.getSize());
        String path = "http://" + nginx.substring(0,nginx.indexOf(":")+1) + port + "/" + storePath.getFullPath() + "?filename=" + fileName;//字符串拼接路径
        fileDO.setFilePath(path);
        fileDO.setUploader(fileDto.getUploader());
        fileDO.setUploaderCode(fileDto.getUploaderCode());
        return fileDO;
    }
}
