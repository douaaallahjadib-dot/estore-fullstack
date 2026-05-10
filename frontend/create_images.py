from PIL import Image, ImageDraw
import os

os.makedirs('src/assets/images/products', exist_ok=True)

def create_image(filename, color_rgb, label):
    img = Image.new('RGB', (400, 600), color=color_rgb)
    draw = ImageDraw.Draw(img)
    text_color = (255, 255, 255) if sum(color_rgb) < 384 else (0, 0, 0)
    draw.text((50, 250), label, fill=text_color)
    img.save(f'src/assets/images/products/{filename}')
    print(f'✓ {filename}')

# Robes
create_image('pastelpink.png', (255, 192, 203), 'Pastel Pink')
create_image('mint.png', (152, 251, 152), 'Mint')
create_image('jaune.png', (255, 215, 0), 'Jaune')
create_image('lavender.png', (230, 230, 250), 'Lavender')

# Sacs
create_image('sac-noir.png', (50, 50, 50), 'Sac Noir')
create_image('sac-beige.png', (245, 245, 220), 'Sac Beige')
create_image('sac-rosegold.png', (183, 148, 133), 'Sac RoseGold')
create_image('sac-marron.png', (139, 69, 19), 'Sac Marron')
create_image('sac-blanc.png', (255, 255, 255), 'Sac Blanc')

# Talons
create_image('talon-noir.png', (30, 30, 30), 'Talon Noir')
create_image('talon-beige.png', (240, 240, 220), 'Talon Beige')
create_image('talon-rouge.png', (220, 20, 60), 'Talon Rouge')
create_image('talon-rose.png', (255, 105, 180), 'Talon Rose')
create_image('talon-dore.png', (255, 215, 0), 'Talon Dore')

# Turquoise
img = Image.new('RGB', (400, 600), color=(64, 224, 208))
draw = ImageDraw.Draw(img)
draw.text((50, 250), 'Turquoise', fill=(255, 255, 255))
img.save('src/assets/images/turquois.png')
print('✓ turquois.png')

print('Done!')
