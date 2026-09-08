function loadsidebar() {
    // لمعرفة اسم الصفحة الحالية وتحديد الخيار النشط تلقائياً
    const currentPage = window.location.pathname.split("/").pop();

    const getActiveClass = (pageName) => {
        return currentPage === pageName 
            ? 'bg-[#0b3d38] border-l-2 border-[#B7A577] text-[#B7A577] font-bold' 
            : 'hover:bg-[#0b3d38] hover:border-l-2 hover:border-[#B7A577] hover:text-[#B7A577]';
    };

    const sidebarHTML = `<aside class="w-64 bg-[#042522] text-white p-6 flex flex-col border-[#888] border-l-[1px] h-screen relative overflow-hidden">

        <div class="absolute inset-0 z-0 opacity-15 pointer-events-none" 
             style="background-image: url('image/battern.png'); background-size: cover; background-position: center;">
        </div>
        <nav class="flex flex-col gap-4 justify-between h-full relative z-10">
            <div class="flex items-center gap-4 border-b-[1px] p-2 border-[#888]">
                <div class="bg-white text-[#042522] w-10 h-10 rounded-full hover:bg-opacity-90 transition relative flex items-center justify-center">
                    <i class="fa-solid fa-user"></i>
                </div>
                <span class="text-sm">Admin</span>
            </div>
            <div class="flex flex-col flex-grow gap-4">
                <a href="DashAdim.html" class="p-3 rounded-lg transition ${getActiveClass('DashAdim.html')}">لوحة التحكم</a>
                <a href="requestes.html" class="p-3 rounded-lg transition ${getActiveClass('requestes.html')}">الطلبات</a>
                <a href="citizens.html" class="p-3 rounded-lg transition ${getActiveClass('citizens.html')}">المواطنون</a>
                <a href="user.html" class="p-3 rounded-lg transition ${getActiveClass('user.html')}">المستخدمين</a>
                <a href="slot.html" class="p-3 rounded-lg transition ${getActiveClass('slot.html')}">المواعيد</a>
            </div>
                
            <div class="hover:bg-[#0b3d38] p-3 rounded-lg">
                <a href="index.html"
                    class="w-full text-white pl-5 pr-10 py-2 rounded-2xl hover:bg-opacity-90 transition relative block"
                    onclick="logout()">
                    <i class="fa-solid fa-right-from-bracket absolute right-3 top-1/2 -translate-y-1/2 text-sm"></i>
                    <span>تسجيل خروج</span>
                </a>
            </div>                            
        </nav>
    </aside>`;

    const container = document.getElementById("sidebar-wrapper");
    if (container) {
        container.innerHTML = sidebarHTML;
    }
}
document.addEventListener('DOMContentLoaded', loadsidebar);

const headerHTML = `<header class="flex items-center justify-between bg-[#042522] p-4 text-white">
    <div class="relative w-1/2">
        <i class="fa-solid fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input type="text" id="searchInput" 
               placeholder="ابحث عن طلب برقم المعاملة أو اسم المواطن..."
               class="w-full pl-4 pr-10 py-2 rounded-xl outline-none text-sm text-black">
    </div>
    
    <div class="flex-shrink-0"> 
        <img src="image/شعار.png" alt="Logo" class="w-11 h-10 object-contain">
    </div>
</header>`;

function loadheader() {
    const container2 = document.getElementById("header");
    if (container2) {
        container2.innerHTML = headerHTML;
    }
}
document.addEventListener('DOMContentLoaded', loadheader);