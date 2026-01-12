import json
import os
import requests
from pathlib import Path
from urllib.parse import urlparse
import time

# Configuración
INPUT_JSON = "tattooer.json"
OUTPUT_DIR = "tattooers"
TIMEOUT = 30  # segundos para descargas
DELAY = 0.5  # delay entre descargas para no saturar

def sanitize_filename(name):
    """Convierte un nombre en un nombre de archivo válido"""
    return "".join(c for c in name if c.isalnum() or c in (' ', '-', '_')).strip()

def download_image(url, filepath):
    """Descarga una imagen desde una URL"""
    try:
        response = requests.get(url, timeout=TIMEOUT, stream=True)
        response.raise_for_status()
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"  ❌ Error descargando {url}: {e}")
        return False

def get_file_extension(url):
    """Obtiene la extensión del archivo desde la URL"""
    parsed = urlparse(url)
    path = parsed.path
    # Remover parámetros de query
    path = path.split('?')[0]
    ext = os.path.splitext(path)[1]
    # Si no hay extensión, asumir jpg
    return ext if ext else '.jpg'

def main():
    print("📖 Leyendo JSON...")
    with open(INPUT_JSON, 'r', encoding='utf-8') as f:
        posts = json.load(f)
    
    print(f"📊 Total de posts encontrados: {len(posts)}")
    
    # Organizar por tatuador
    tattooers = {}
    
    for post in posts:
        username = post.get('account_username', 'unknown')
        account_name = post.get('account_name', '')
        
        if username not in tattooers:
            tattooers[username] = {
                'username': username,
                'name': account_name,
                'profile_picture_url': post.get('account_profile_picture', ''),
                'account_url': post.get('account_url', ''),
                'posts': []
            }
        
        # Agregar info del post
        post_info = {
            'post_url': post.get('post_url', ''),
            'caption': post.get('caption', ''),
            'thumbnail_url': post.get('thumbnail', ''),
            'media_content': post.get('media_content', [])
        }
        tattooers[username]['posts'].append(post_info)
    
    print(f"👥 Tatuadores únicos encontrados: {len(tattooers)}")
    print("\n📥 Descargando imágenes...\n")
    
    # Crear directorio base
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Estructura simplificada para el JSON final
    simplified_data = []
    
    for username, data in tattooers.items():
        print(f"\n🎨 Procesando: {data['name']} (@{username})")
        
        # Crear carpeta para el tatuador
        tattooer_dir = os.path.join(OUTPUT_DIR, username)
        os.makedirs(tattooer_dir, exist_ok=True)
        
        # Descargar foto de perfil
        if data['profile_picture_url']:
            profile_ext = get_file_extension(data['profile_picture_url'])
            profile_path = os.path.join(tattooer_dir, f"profile{profile_ext}")
            print(f"  📷 Descargando foto de perfil...")
            download_image(data['profile_picture_url'], profile_path)
            time.sleep(DELAY)
        
        # Crear carpeta para posts
        posts_dir = os.path.join(tattooer_dir, "posts")
        os.makedirs(posts_dir, exist_ok=True)
        
        # Descargar imágenes/videos de cada post
        post_count = 0
        for idx, post in enumerate(data['posts']):
            post_folder = os.path.join(posts_dir, f"post_{idx + 1}")
            os.makedirs(post_folder, exist_ok=True)
            
            # Descargar thumbnail
            if post['thumbnail_url']:
                thumb_ext = get_file_extension(post['thumbnail_url'])
                thumb_path = os.path.join(post_folder, f"thumbnail{thumb_ext}")
                download_image(post['thumbnail_url'], thumb_path)
                time.sleep(DELAY)
            
            # Descargar media content
            for media_idx, media in enumerate(post['media_content']):
                media_url = media.get('url', '')
                if media_url:
                    media_type = media.get('type', 'image')
                    if media_type == 'image':
                        media_ext = get_file_extension(media_url)
                        media_path = os.path.join(post_folder, f"image_{media_idx + 1}{media_ext}")
                    else:  # video
                        media_ext = get_file_extension(media_url) or '.mp4'
                        media_path = os.path.join(post_folder, f"video_{media_idx + 1}{media_ext}")
                    
                    print(f"  📥 Descargando {media_type} {media_idx + 1} del post {idx + 1}...")
                    download_image(media_url, media_path)
                    time.sleep(DELAY)
            
            post_count += 1
        
        print(f"  ✅ {post_count} posts procesados")
        
        # Agregar a estructura simplificada
        profile_pic_path = None
        if data['profile_picture_url']:
            profile_ext = get_file_extension(data['profile_picture_url'])
            profile_pic_path = f"{username}/profile{profile_ext}"
        
        simplified_data.append({
            'username': username,
            'name': data['name'],
            'account_url': data['account_url'],
            'profile_picture': profile_pic_path,
            'total_posts': post_count
        })
    
    # Guardar JSON simplificado
    simplified_json_path = os.path.join(OUTPUT_DIR, "tattooers.json")
    with open(simplified_json_path, 'w', encoding='utf-8') as f:
        json.dump(simplified_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Proceso completado!")
    print(f"📁 Archivos guardados en: {OUTPUT_DIR}/")
    print(f"📄 JSON simplificado: {simplified_json_path}")
    print(f"📊 Total tatuadores: {len(simplified_data)}")

if __name__ == "__main__":
    main()
