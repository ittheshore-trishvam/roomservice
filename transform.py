import re

with open('c:/Users/Omada/.gemini/antigravity/playground/white-plasma/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'<div class="menu-item" data-category="comfort">\s*<div class="menu-img-placeholder" style="background-image: url\(\'(.*?)\'\);"></div>\s*<div class="menu-details">\s*<div class="menu-title-price">(.+?)</div>\s*<p class="menu-desc">(.*?)</p>\s*</div>\s*</div>', re.DOTALL)

def replace_swiggy(match):
    img_url = match.group(1)
    title_price_block = match.group(2)
    desc = match.group(3).strip()
    
    symbols_match = re.search(r'<span class="dietary-symbols">(.*?)</span>', title_price_block)
    symbols = symbols_match.group(1) if symbols_match else ''
    
    title_price_no_symbols = re.sub(r'<span class="dietary-symbols">.*?</span>', '', title_price_block)
    title_match = re.search(r'<h3>(.*?)</h3>', title_price_no_symbols, re.DOTALL)
    # clean up any inner tags if needed, but keeping them is fine
    title = title_match.group(1).strip() if title_match else 'Title'
    # For Indo-Chinese, there's a div.menu-title-wrap. The regex still finds <h3>
    
    price_match = re.search(r'<span class="price">(.*?)</span>', title_price_block)
    price = price_match.group(1) if price_match else ''
    
    swiggy_html = f"""<div class="menu-item swiggy-style-item" data-category="comfort">
                    <div class="menu-details">
                        <div class="swiggy-diet-tag">
                            <span class="dietary-symbols">{symbols}</span>
                        </div>
                        <div class="menu-title-price">
                            <h3>{title}</h3>
                            <span class="price">{price}</span>
                        </div>
                        <p class="menu-desc">{desc}</p>
                    </div>
                    <div class="swiggy-img-wrap">
                        <div class="menu-img-placeholder" style="background-image: url('{img_url}');"></div>
                        <button class="swiggy-add-btn">ADD</button>
                    </div>
                </div>"""
    return swiggy_html

new_content = pattern.sub(replace_swiggy, content)

with open('c:/Users/Omada/.gemini/antigravity/playground/white-plasma/index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Transformation complete")
