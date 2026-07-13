import re

with open("components/IntelligencePhoneChat.tsx", "r") as f:
    content = f.read()

# Replace colors and styles
content = content.replace("background: '#F6F4EB'", "background: 'transparent'")
content = content.replace("color: '#18181B'", "color: '#ffffff'")
content = content.replace("color: '#52525B'", "color: '#A1A1AA'")
content = content.replace("background: '#ffffff',\n          borderRadius: '0'", "background: 'rgba(10, 11, 14, 0.4)',\n          borderRadius: '0'")
content = content.replace("border: '1px solid rgba(0,0,0,0.1)'", "border: '1px solid #212326'")
content = content.replace("borderRight: '1px solid rgba(0,0,0,0.04)'", "borderRight: '1px solid #212326'")
content = content.replace("background: 'rgba(0,0,0,0.03)'", "background: 'rgba(255,255,255,0.03)'")
content = content.replace("border: '1px solid rgba(0,0,0,0.04)'", "border: '1px solid #212326'")
content = content.replace("background: activeTab === idx ? '#ffffff' : 'transparent'", "background: activeTab === idx ? '#212326' : 'transparent'")
content = content.replace("border: `1px solid ${activeTab === idx ? 'rgba(0,0,0,0.05)' : 'transparent'}`", "border: `1px solid ${activeTab === idx ? '#212326' : 'transparent'}`")
content = content.replace("color: activeTab === idx ? '#18181B' : '#71717A'", "color: activeTab === idx ? '#ffffff' : '#A1A1AA'")
content = content.replace("color: '#3F3F46'", "color: '#D4D4D8'")
content = content.replace("background: '#FAFAFA'", "background: 'transparent'")
content = content.replace("linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0) 100%)", "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 80%, rgba(255,255,255,0) 100%)")
content = content.replace("background: '#ffffff', \n                      border: '1px solid rgba(0,0,0,0.06)'", "background: '#18181B', \n                      border: '1px solid #212326'")
content = content.replace("background: '#f4f4f5'", "background: '#18181B'")
content = content.replace("color: '#27272A'", "color: '#FAFAFA'")
content = content.replace("background: 'rgba(255, 255, 255, 0.4)'", "background: 'rgba(20, 21, 24, 0.6)'")
content = content.replace("border: '1px solid rgba(255, 255, 255, 0.6)'", "border: '1px solid #212326'")
content = content.replace("borderTop: '1px solid rgba(255, 255, 255, 0.9)'", "borderTop: '1px solid #212326'")
content = content.replace("background: '#ffffff',\n            borderRadius: '12px'", "background: '#0A0A0C',\n            borderRadius: '12px'")
content = content.replace("border: '1px solid rgba(0,0,0,0.05)',\n            display: 'flex'", "border: '1px solid #212326',\n            display: 'flex'")
content = content.replace("typingText ? '#18181B' : '#A1A1AA'", "typingText ? '#FAFAFA' : '#52525B'")
content = content.replace("background: '#18181B', verticalAlign: 'middle'", "background: '#FAFAFA', verticalAlign: 'middle'")
content = content.replace("typingText ? '#18181B' : '#f4f4f5'", "typingText ? '#FAFAFA' : '#18181B'")
content = content.replace("typingText ? '#fff' : '#A1A1AA'", "typingText ? '#000' : '#52525B'")
content = content.replace("boxShadow: '0 12px 32px rgba(0, 0, 0, 0.03), 0 2px 6px rgba(0,0,0,0.02)'", "boxShadow: 'none'")
content = content.replace("boxShadow: '0 12px 32px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.02)'", "boxShadow: 'none'")
content = content.replace("border: '1px solid rgba(0,0,0,0.06)'", "border: '1px solid #212326'")

with open("components/IntelligencePhoneChat.tsx", "w") as f:
    f.write(content)
