import json
import os

log_dir = "/Users/noorislam/.gemini/antigravity-ide/brain/"
for conv_id in os.listdir(log_dir):
    log_path = os.path.join(log_dir, conv_id, ".system_generated/logs/transcript.jsonl")
    if not os.path.exists(log_path): continue
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get("type") == "TOOL_RESPONSE" and "diff \"SVGs/SOP Agents 1.svg\" \"public/SVGs/SOP Agents 1.svg\"" in data.get("content", "") or ("output" in data.get("content", "") and "diff \"SVGs/SOP Agents 1.svg\"" in data.get("content", "")) or ("mpath" in data.get("content", "")):
                    if "diff " in data.get("content", ""):
                        print("FOUND DIFF IN:", conv_id)
                        print(data["content"])
            except Exception as e:
                pass
