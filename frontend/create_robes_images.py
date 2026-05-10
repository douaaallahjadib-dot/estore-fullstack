import os
import struct
import zlib

# Créer le dossier assets/images s'il n'existe pas
os.makedirs('src/assets/images', exist_ok=True)

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
    with open(f'src/assets/images/{filename}', 'wb') as f:
        f.write(png_data)
    print(f'✓ {filename} créé')

# Créer les images des 5 robes
robes = {
    'pastelpink.png': (255, 192, 203),  # Rose pastel
    'mint.png': (152, 251, 152),        # Menthe
    'turquois.png': (64, 224, 208),     # Turquoise
    'jaune.png': (255, 215, 0),         # Jaune
    'lavender.png': (230, 230, 250),    # Lavande
}

print("Création des images des robes...")
for filename, color in robes.items():
    create_simple_png(filename, color, filename)

print('✅ Toutes les images des robes sont créées dans src/assets/images!')