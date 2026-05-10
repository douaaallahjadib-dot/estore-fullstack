import os
import struct
import zlib

os.makedirs('src/assets/images/products', exist_ok=True)

def create_simple_png(filename, color_hex, text_label):
    """Créer un PNG simple avec une couleur unie"""
    width, height = 400, 600
    
    # Convertir hex color to RGB
    if isinstance(color_hex, str):
        r = int(color_hex[1:3], 16)
        g = int(color_hex[3:5], 16)
        b = int(color_hex[5:7], 16)
    else:
        r, g, b = color_hex
    
    # Créer données PNG brutes
    png_header = b'\x89PNG\r\n\x1a\n'
    
    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr_crc = zlib.crc32(b'IHDR' + ihdr_data) & 0xffffffff
    ihdr = struct.pack('>I', 13) + b'IHDR' + ihdr_data + struct.pack('>I', ihdr_crc)
    
    # IDAT chunk (image data) - remplir avec la couleur
    scanlines = b''
    for _ in range(height):
        scanline = b'\x00'  # filter type none
        for _ in range(width):
            scanline += bytes([r, g, b])
        scanlines += scanline
    
    idat_data = zlib.compress(scanlines, 9)
    idat_crc = zlib.crc32(b'IDAT' + idat_data) & 0xffffffff
    idat = struct.pack('>I', len(idat_data)) + b'IDAT' + idat_data + struct.pack('>I', idat_crc)
    
    # IEND chunk
    iend_crc = zlib.crc32(b'IEND') & 0xffffffff
    iend = struct.pack('>I', 0) + b'IEND' + struct.pack('>I', iend_crc)
    
    # Assembler le PNG
    png_data = png_header + ihdr + idat + iend
    
    # Écrire le fichier
    with open(f'src/assets/images/products/{filename}', 'wb') as f:
        f.write(png_data)
    print(f'✓ {filename}')

# Créer les images
colors = {
    'pastelpink.png': (255, 192, 203),
    'mint.png': (152, 251, 152),
    'jaune.png': (255, 215, 0),
    'lavender.png': (230, 230, 250),
    'sac-noir.png': (50, 50, 50),
    'sac-beige.png': (245, 245, 220),
    'sac-rosegold.png': (183, 148, 133),
    'sac-marron.png': (139, 69, 19),
    'sac-blanc.png': (255, 255, 255),
    'talon-noir.png': (30, 30, 30),
    'talon-beige.png': (240, 240, 220),
    'talon-rouge.png': (220, 20, 60),
    'talon-rose.png': (255, 105, 180),
    'talon-dore.png': (255, 215, 0),
}

for filename, color in colors.items():
    create_simple_png(filename, color, filename)

# Turquoise au bon emplacement (dans products/)
create_simple_png('turquois.png', (64, 224, 208), 'turquois')

print('✅ Toutes les images sont créées!')
