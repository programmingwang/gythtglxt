package com.gythtglxt.dto;

import com.gythtglxt.dataobject.FileDO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/5 10:32
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileDto extends FileDO {
    @NotNull(message = "文件不能为空")
    private MultipartFile file;
}
