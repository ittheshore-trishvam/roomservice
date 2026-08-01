document.addEventListener('DOMContentLoaded', () => {
    // Outlet Switching
    const outletTabs = document.querySelectorAll('.outlet-tab');
    const outletContents = document.querySelectorAll('.outlet-content');

    outletTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all outlet tabs
            outletTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const targetOutlet = tab.getAttribute('data-outlet');

            // Show/hide outlet contents
            outletContents.forEach(content => {
                if (content.id === `outlet-${targetOutlet}`) {
                    content.classList.add('active');
                    // Reset menu filtering to "all" for the newly active outlet
                    const allTab = content.querySelector('.menu-tab[data-category="all"]');
                    if (allTab) {
                        // Click programmatically without smooth scroll triggers if possible,
                        // but since it's user action we can trigger normally.
                        allTab.click();
                    }
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Menu Filtering scoped per outlet
    outletContents.forEach(outlet => {
        const tabs = outlet.querySelectorAll('.menu-tab');
        const items = outlet.querySelectorAll('.menu-item, .menu-section-divider, .menu-sub-heading');
        const menuGrid = outlet.querySelector('.menu-grid');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from tabs in this outlet only
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const category = tab.getAttribute('data-category');

                items.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');

                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-out forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Scroll to menu grid of this outlet when category changes
                if (menuGrid) {
                    const offset = 100; // Offset for sticky header
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = menuGrid.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Categories button
    const backToCatsBtns = document.querySelectorAll('.back-to-categories');
    backToCatsBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Find the closest ancestor outlet content container
            const parentOutlet = btn.closest('.outlet-content');
            if (parentOutlet) {
                const categories = parentOutlet.querySelector('.menu-categories');
                if (categories) {
                    const offset = 120;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = categories.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Header Scroll Effect (Updated for Coastal Theme)
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.padding = '0.8rem 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.6)';
            header.style.padding = '1.2rem 0';
            header.style.boxShadow = 'none';
        }
    });
});
