document.addEventListener('DOMContentLoaded', function() {
    // 1. CODE NAVIGATION
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class từ tất cả links và pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class cho link được click và page tương ứng
            this.classList.add('active');
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // Scroll lên đầu trang khi chuyển section
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. DEBUG ẢNH VÀ TẢI ẢNH THAY THẾ
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Kiểm tra khi ảnh tải thành công
        img.addEventListener('load', function() {
            console.log(`✅ Ảnh tải thành công: ${this.src}`);
            
            // Nếu là ảnh thành viên, thêm hiệu ứng
            if (this.classList.contains('member-image')) {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }
        });
        
        // Xử lý khi ảnh lỗi
        img.addEventListener('error', function() {
            console.log(` Lỗi tải ảnh: ${this.src}`);
            
            // Đánh dấu ảnh lỗi
            this.style.border = '2px solid #ff4444';
            this.style.opacity = '0.7';
            
            // Hiển thị placeholder cho ảnh quan trọng
            const parent = this.parentElement;
            
            // Ảnh logo
            if (parent.classList.contains('logo') || this.classList.contains('logo-image')) {
                this.alt = 'Lỗi tải logo CLB';
                parent.innerHTML = '<div class="logo-placeholder">CLB<br>DSC</div>';
            }
            
            // Ảnh nhóm
            else if (parent.classList.contains('team-photo') || this.classList.contains('team-image')) {
                this.alt = 'Lỗi tải ảnh nhóm';
                parent.innerHTML = '<div class="team-placeholder">BugBusters Team</div>';
            }
            
            // Ảnh thành viên
            else if (parent.classList.contains('member-photo') || this.classList.contains('member-image')) {
                this.alt = 'Lỗi tải ảnh thành viên';
                const memberName = this.alt.replace('Ảnh ', '');
                parent.innerHTML = `<div class="member-placeholder">${memberName.charAt(0)}</div>`;
            }
        });
        
        // Thêm hiệu ứng hover cho ảnh thành viên
        if (img.classList.contains('member-image')) {
            img.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            img.style.opacity = '0.9';
            
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.opacity = '1';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.opacity = '0.9';
            });
        }
    });

    // 3. KIỂM TRA ĐƯỜNG DẪN ẢNH KHI KHỞI ĐỘNG
    console.log(' === KIỂM TRA ĐƯỜNG DẪN ẢNH ===');
    
    // Kiểm tra ảnh logo
    const logoImg = document.querySelector('.logo-image');
    if (logoImg) {
        console.log(`Logo path: ${logoImg.src}`);
        console.log(`Logo alt: ${logoImg.alt}`);
    } else {
        console.log('Không tìm thấy ảnh logo');
    }
    
    // Kiểm tra ảnh nhóm
    const teamImg = document.querySelector('.team-image');
    if (teamImg) {
        console.log(`Team image path: ${teamImg.src}`);
        console.log(`Team image alt: ${teamImg.alt}`);
    } else {
        console.log('⚠️ Không tìm thấy ảnh nhóm');
    }
    
    // Kiểm tra ảnh thành viên
    const memberImgs = document.querySelectorAll('.member-image');
    console.log(` Tổng số ảnh thành viên: ${memberImgs.length}`);
    memberImgs.forEach((img, index) => {
        console.log(`Thành viên ${index + 1}: ${img.alt} - ${img.src}`);
    });

    // 4. TẠO PLACEHOLDER STYLE NẾU ẢNH LỖI
    const style = document.createElement('style');
    style.textContent = `
        .logo-placeholder {
            width: 50px;
            height: 50px;
            background: #4285f4;
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
            text-align: center;
            line-height: 1.2;
        }
        
        .team-placeholder {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #4285f4, #34a853);
            color: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: bold;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }
        
        .member-placeholder {
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, #4285f4, #34a853);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .error {
            position: relative;
        }
        
        .error::after {
            content: "Lỗi tải ảnh";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ff4444;
            font-size: 0.9rem;
            background: rgba(255,255,255,0.9);
            padding: 2px 8px;
            border-radius: 4px;
        }
    `;
    document.head.appendChild(style);

    // 5. TÍNH NĂNG THÊM: LOADING ANIMATION CHO ẢNH
    const addLoadingAnimation = () => {
        images.forEach(img => {
            if (!img.complete) {
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                const handleLoad = () => {
                    img.style.opacity = '1';
                };
                
                img.addEventListener('load', handleLoad);
            }
        });
    };
    
    addLoadingAnimation();

    // 6. LOG THÔNG TIN TRANG
    console.log(' Trang đã được khởi chạy thành công!');
    console.log(` Tổng số sections: ${pages.length}`);
    console.log(` Tổng số navigation links: ${navLinks.length}`);
    console.log(` Tổng số ảnh: ${images.length}`);
});