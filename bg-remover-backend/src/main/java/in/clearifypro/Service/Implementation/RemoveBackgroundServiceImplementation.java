package in.clearifypro.Service.Implementation;

import in.clearifypro.Client.ClipDropClient;
import in.clearifypro.Service.RemoveBackgroundService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RemoveBackgroundServiceImplementation implements RemoveBackgroundService {
    @Value("${clipdrop.api.key}")
    private String apiKey;

    private final ClipDropClient clipDropClient;

    @Override
    public byte[] removeBackground(MultipartFile file) {
        return clipDropClient.removeBackground ( file , apiKey );
    }
}
