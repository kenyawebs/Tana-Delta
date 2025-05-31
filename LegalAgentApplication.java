// Kenya Criminal Legal Agent Assistant - Main Application Class
package com.sureintel.legalagent;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

import androidx.appcompat.app.AppCompatDelegate;

import com.sureintel.legalagent.data.repository.UserRepository;
import com.sureintel.legalagent.data.repository.QueryRepository;
import com.sureintel.legalagent.data.repository.DocumentRepository;
import com.sureintel.legalagent.network.ApiClient;
import com.sureintel.legalagent.utils.PreferenceManager;

public class LegalAgentApplication extends Application {

    private static final String NOTIFICATION_CHANNEL_ID = "legal_agent_channel";
    private static LegalAgentApplication instance;
    private PreferenceManager preferenceManager;
    private ApiClient apiClient;
    private UserRepository userRepository;
    private QueryRepository queryRepository;
    private DocumentRepository documentRepository;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        
        // Initialize preferences
        preferenceManager = new PreferenceManager(this);
        
        // Set app theme based on preferences
        setupTheme();
        
        // Initialize API client
        apiClient = new ApiClient(this);
        
        // Initialize repositories
        userRepository = new UserRepository(apiClient, preferenceManager);
        queryRepository = new QueryRepository(apiClient);
        documentRepository = new DocumentRepository(apiClient);
        
        // Create notification channel for Android O and above
        createNotificationChannel();
    }
    
    public static LegalAgentApplication getInstance() {
        return instance;
    }
    
    public PreferenceManager getPreferenceManager() {
        return preferenceManager;
    }
    
    public ApiClient getApiClient() {
        return apiClient;
    }
    
    public UserRepository getUserRepository() {
        return userRepository;
    }
    
    public QueryRepository getQueryRepository() {
        return queryRepository;
    }
    
    public DocumentRepository getDocumentRepository() {
        return documentRepository;
    }
    
    private void setupTheme() {
        boolean isDarkMode = preferenceManager.isDarkModeEnabled();
        int mode = isDarkMode ? AppCompatDelegate.MODE_NIGHT_YES : AppCompatDelegate.MODE_NIGHT_NO;
        AppCompatDelegate.setDefaultNightMode(mode);
    }
    
    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    NOTIFICATION_CHANNEL_ID,
                    "Legal Agent Notifications",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            channel.setDescription("Notifications for query and document updates");
            
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(channel);
            }
        }
    }
}
