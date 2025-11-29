document.addEventListener('DOMContentLoaded', function() {
    // Code navigation hiện có
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            this.classList.add('active');
            const pageId = this.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });

    // Debug ảnh
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            console.log('✅ Ảnh tải thành công:', this.src);
        });
        img.addEventListener('error', function() {
            console.log('❌ Lỗi tải ảnh:', this.src);
            this.style.border = '2px solid red';
            
            // Hiển thị thông báo lỗi
            const parent = this.parentElement;
            if (parent.classList.contains('team-photo')) {
                parent.setAttribute('data-error', this.src);
                parent.classList.add('error');
            }
        });
    });

    // Kiểm tra đường dẫn
    console.log('📍 Đang kiểm tra đường dẫn ảnh...');
    const logoImg = document.querySelector('.logo-image');
    const teamImg = document.querySelector('.team-image');
    console.log('Logo path:', logoImg ? logoImg.src : 'Không tìm thấy');
    console.log('Team image path:', teamImg ? teamImg.src : 'Không tìm thấy');
});