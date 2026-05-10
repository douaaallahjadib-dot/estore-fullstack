import os
import struct
import zlib

def create_simple_png(filename, color_rgb, width=400, height=600):
    """Créer un PNG simple avec une couleur unie"""
    r, g, b = color_rgb

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
    with open(filename, 'wb') as f:
        f.write(png_data)
    print(f'✓ {filename} créé')

def create_catalog_html():
    """Créer le fichier HTML du catalogue"""
    html_content = '''<div class="container py-5">

  <!-- Titre principal -->
  <h1 class="text-center mb-5" style="color: #8B5E3C; font-family: 'Playfair Display', serif;">
    ✨ H&D ELEGANCE ✨
  </h1>
  <h3 class="text-center mb-5" style="color: #D4A373;">Summer Breeze 2026</h3>

  <!-- ==================== SECTION ROBES ==================== -->
  <h2 class="mb-4 pb-2" style="color: #D4A373; border-bottom: 2px solid #FFB6C1;">
    👗 Robes d'Été
  </h2>
  <div class="row mb-5">

    <!-- Robe 1 - Pastel Pink Floral Maxi Dress -->
    <div class="col-md-6 mb-4">
      <div class="card h-100 shadow-sm border-0 product-card">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="assets/images/pastelpink.png" class="img-fluid rounded-start" alt="Pastel Pink Floral Maxi Dress"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/FFB6C1/white?text=Robe+Pastel+Pink'">
          </div>
          <div class="col-md-6">
            <img src="assets/images/pastelpink.png" class="img-fluid rounded-end" alt="Floral Print Detail"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/FFB6C1/white?text=Floral+Detail'">
          </div>
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">Pastel Pink Floral Maxi Dress</h5>
          <p class="card-text text-muted">Robe maxi imprimé floral, tissu fluide et léger</p>
          <p class="fs-3 fw-bold" style="color: #FF69B4;">520 DH</p>
          <button class="btn w-100 add-to-cart" style="background-color: #D4A373; color: white;" data-name="Pastel Pink Floral Maxi Dress" data-price="520">
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </div>

    <!-- Robe 2 - Casual Mint Cotton Maxi Dress -->
    <div class="col-md-6 mb-4">
      <div class="card h-100 shadow-sm border-0 product-card">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="assets/images/mint.png" class="img-fluid rounded-start" alt="Casual Mint Cotton Maxi Dress"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/98FB98/white?text=Robe+Mint'">
          </div>
          <div class="col-md-6">
            <img src="assets/images/mint.png" class="img-fluid rounded-end" alt="Fabric Texture Detail"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/98FB98/white?text=Cotton+Detail'">
          </div>
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">Casual Mint Cotton Maxi Dress</h5>
          <p class="card-text text-muted">Robe décontractée en coton menthe, fraîche et confortable</p>
          <p class="fs-3 fw-bold" style="color: #FF69B4;">380 DH</p>
          <button class="btn w-100 add-to-cart" style="background-color: #D4A373; color: white;" data-name="Casual Mint Cotton Maxi Dress" data-price="380">
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </div>

    <!-- Robe 3 - Turquoise Blue Flowy Beach Dress -->
    <div class="col-md-6 mb-4">
      <div class="card h-100 shadow-sm border-0 product-card">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="assets/images/turquois.png" class="img-fluid rounded-start" alt="Turquoise Blue Flowy Beach Dress"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/40E0D0/white?text=Robe+Turquoise'">
          </div>
          <div class="col-md-6">
            <img src="assets/images/turquois.png" class="img-fluid rounded-end" alt="Flowy Fabric Detail"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/40E0D0/white?text=Flowy+Detail'">
          </div>
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">Turquoise Blue Flowy Beach Dress</h5>
          <p class="card-text text-muted">Robe de plage turquoise, fluide et légère</p>
          <p class="fs-3 fw-bold" style="color: #FF69B4;">340 DH</p>
          <button class="btn w-100 add-to-cart" style="background-color: #D4A373; color: white;" data-name="Turquoise Blue Flowy Beach Dress" data-price="340">
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </div>

    <!-- Robe 4 - Casual Yellow Wrap Sundress -->
    <div class="col-md-6 mb-4">
      <div class="card h-100 shadow-sm border-0 product-card">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="assets/images/jaune.png" class="img-fluid rounded-start" alt="Casual Yellow Wrap Sundress"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/FFD700/white?text=Robe+Jaune'">
          </div>
          <div class="col-md-6">
            <img src="assets/images/jaune.png" class="img-fluid rounded-end" alt="Wrap Closure Detail"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/FFD700/white?text=Wrap+Detail'">
          </div>
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">Casual Yellow Wrap Sundress</h5>
          <p class="card-text text-muted">Robe jaune à nouer, parfaite pour l'été</p>
          <p class="fs-3 fw-bold" style="color: #FF69B4;">360 DH</p>
          <button class="btn w-100 add-to-cart" style="background-color: #D4A373; color: white;" data-name="Casual Yellow Wrap Sundress" data-price="360">
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </div>

    <!-- Robe 5 - Elegant Lavender Cocktail Dress -->
    <div class="col-md-6 mb-4">
      <div class="card h-100 shadow-sm border-0 product-card">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="assets/images/lavender.png" class="img-fluid rounded-start" alt="Elegant Lavender Cocktail Dress"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/E6E6FA/white?text=Robe+Lavande'">
          </div>
          <div class="col-md-6">
            <img src="assets/images/lavender.png" class="img-fluid rounded-end" alt="Neckline Detail"
                 style="height: 350px; width: 100%; object-fit: cover;"
                 onerror="this.src='https://placehold.co/400x600/E6E6FA/white?text=Detail'">
          </div>
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">Elegant Lavender Cocktail Dress</h5>
          <p class="card-text text-muted">Robe cocktail lavande, élégante et raffinée</p>
          <p class="fs-3 fw-bold" style="color: #FF69B4;">590 DH</p>
          <button class="btn w-100 add-to-cart" style="background-color: #D4A373; color: white;" data-name="Elegant Lavender Cocktail Dress" data-price="590">
            🛒 Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- CSS supplémentaire -->
<style>
  .product-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  }
  .add-to-cart {
    transition: all 0.3s ease;
  }
  .add-to-cart:hover {
    background-color: #FF69B4 !important;
    transform: scale(1.02);
  }
  .card-img-top {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
</style>'''

    with open('src/app/features/catalog/catalog/catalog.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    print('✓ catalog.html recréé')

def main():
    print("🚀 Début de la création automatique du catalogue...")

    # Créer le dossier assets/images s'il n'existe pas
    os.makedirs('src/assets/images', exist_ok=True)

    # Créer les images des 5 robes
    robes = {
        'src/assets/images/pastelpink.png': (255, 192, 203),  # Rose pastel
        'src/assets/images/mint.png': (152, 251, 152),        # Menthe
        'src/assets/images/turquois.png': (64, 224, 208),     # Turquoise
        'src/assets/images/jaune.png': (255, 215, 0),         # Jaune
        'src/assets/images/lavender.png': (230, 230, 250),    # Lavande
    }

    print("📸 Création des images des robes...")
    for filepath, color in robes.items():
        create_simple_png(filepath, color)

    # Créer le catalogue HTML
    print("📄 Création du catalogue HTML...")
    create_catalog_html()

    print("✅ Catalogue complet créé automatiquement!")
    print("   - 5 images PNG créées dans src/assets/images/")
    print("   - Catalogue HTML mis à jour avec les bonnes références")

if __name__ == "__main__":
    main()