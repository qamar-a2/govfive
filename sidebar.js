const sidebarHTML =`<aside class="w-64 bg-[#042522] text-white p-6 flex flex-col border-[#888]  border-l-[1px] h-screen">
            <nav class="flex flex-col gap-4 justify-between h-full">
                <div class="flex items-center gap-4 border-b-[1px] p-2 border-[#888]">
                    <div class="bg-white text-[#042522] w-10 h-10 rounded-full hover:bg-opacity-90 transition relative flex items-center justify-center">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <span class="text-sm">Admin</span>
                </div>
                <div class="flex flex-col flex-grow gap-4">
                         <a href="#" class="hover:bg-[#0b3d38] hover:border-l-2 hover:border-[#B7A577] hover:text-[#B7A577] p-3 rounded-lg">لوحة التحكم</a>
                         <a href="#" class="hover:bg-[#0b3d38] hover:border-l-2 hover:border-[#B7A577] hover:text-[#B7A577] p-3 rounded-lg">الطلبات</a>
                         <a href="#" class="hover:bg-[#0b3d38] hover:border-l-2 hover:border-[#B7A577] hover:text-[#B7A577] p-3 rounded-lg">المستخدمين</a>
                         <a href="#" class="hover:bg-[#0b3d38] hover:border-l-2 hover:border-[#B7A577] hover:text-[#B7A577] p-3 rounded-lg">المواعيد</a>
                </div>
                    
                <div class=" hover:bg-[#0b3d38] p-3 rounded-lg">
                    <a href="index.html"
                        class="w-full text-white pl-5 pr-10 py-2 rounded-2xl hover:bg-opacity-90 transition relative"
                        onclick="logout()">
                        <i class="fa-solid fa-right-from-bracket absolute right-3 top-1/2 -translate-y-1/2 text-sm"></i>
                        <span >تسجيل خروج</span>
                    </a>
                </div>
               
                
            </nav>
        </aside>`
        function loadsidebar(){
            const countiner=document.getElementById("sidebar-wrapper")
            if(countiner){
                countiner.innerHTML=sidebarHTML
            }
        }
        document.addEventListener('DOMContentLoaded' , loadsidebar)

    const headerHTML=`<header class="flex items-center justify-between bg-[#042522] p-4 text-white">
    
    <div class="relative w-1/2">
        <i class="fa-solid fa-search absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input type="text" id="searchInput" 
               placeholder="ابحث عن طلب برقم المعاملة أو اسم المواطن..."
               class="w-full pl-4 pr-10 py-2 rounded-xl outline-none text-sm text-black">
    </div>
    
    <div class="flex-shrink-0"> 
        <img src="image/شعار.png" alt="Logo" class="w-11 h-10 object-contain">
    </div>
</header>`

             function loadheader(){
            const countiner2=document.getElementById("header")
            if(countiner2){
                countiner2.innerHTML=headerHTML
            }
        }
        document.addEventListener('DOMContentLoaded' , loadheader)



