// notif-check.js
// فحص الإشعارات كل دقيقة + صوت + توست، يشتغل بأي صفحة بالموقع
// كفاية تضيفي: <script src="notif-check.js"></script> قبل </body> بأي صفحة

(function () {
    var API_BASE = "http://egovservices.runasp.net";
    var POLL_INTERVAL = 5000; // كل 5 ثواني
    var knownIds = null; // null = لسا ما أخدنا الخط الأساسي
    var audioCtxGlobal = null;

    function getToken() {
        return localStorage.getItem("userToken");
    }

    // ---------- الصوت ----------
    function unlockAudio() {
        if (!audioCtxGlobal) {
            try {
                audioCtxGlobal = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log("تعذر إنشاء AudioContext: " + e);
            }
        } else if (audioCtxGlobal.state === "suspended") {
            audioCtxGlobal.resume();
        }
    }
    document.addEventListener("click", unlockAudio);

    function playNotificationSound() {
        try {
            if (!audioCtxGlobal) {
                audioCtxGlobal = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtxGlobal.state === "suspended") {
                audioCtxGlobal.resume();
            }
            var oscillator = audioCtxGlobal.createOscillator();
            var gainNode = audioCtxGlobal.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioCtxGlobal.destination);
            oscillator.type = "sine";
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioCtxGlobal.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtxGlobal.currentTime + 0.5);
            oscillator.start();
            oscillator.stop(audioCtxGlobal.currentTime + 0.5);
        } catch (e) {
            console.log("تعذر تشغيل الصوت: " + e);
        }
    }

    // ---------- التوست (يتبني لحاله بأي صفحة) ----------
    function injectToastStyles() {
        if (document.getElementById("notif-check-style")) return;
        var style = document.createElement("style");
        style.id = "notif-check-style";
        style.textContent =
            "#globalNotifToast{" +
            "position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);" +
            "background:#042522;border:1px solid #C9A227;color:#f7f5f0;padding:12px 22px;" +
            "border-radius:10px;opacity:0;pointer-events:none;transition:all .3s ease;" +
            "z-index:99999;font-weight:500;font-size:14px;box-shadow:0 4px 14px rgba(4,37,34,0.25);" +
            "font-family:'Tajawal',sans-serif;direction:rtl;}" +
            "#globalNotifToast.show{opacity:1;transform:translateX(-50%) translateY(0);}";
        document.head.appendChild(style);
    }

    function showGlobalToast(msg) {
        injectToastStyles();
        var t = document.getElementById("globalNotifToast");
        if (!t) {
            t = document.createElement("div");
            t.id = "globalNotifToast";
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.classList.add("show");
        setTimeout(function () {
            t.classList.remove("show");
        }, 2800);
    }

    // ---------- الفحص ----------
    function checkNotifications() {
        var token = getToken();
        if (!token) return; // المستخدم مش مسجل دخول

        fetch(API_BASE + "/api/Notifications", {
            method: "GET",
            headers: { "Authorization": "Bearer " + token }
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && data.success && data.data && data.data.notifications) {
                    var list = data.data.notifications;
                    var currentIds = list.map(function (n) { return n.id; });

                    if (knownIds === null) {
                        // أول فحص: بس نسجل الموجود حالياً كخط أساس، بدون صوت
                        knownIds = {};
                        for (var i = 0; i < currentIds.length; i++) {
                            knownIds[currentIds[i]] = true;
                        }
                        return;
                    }

                    // نلاقي أي إشعار عنده id ما شفناه قبل هيك (بغض النظر عن isRead)
                    var newOnes = [];
                    for (var j = 0; j < list.length; j++) {
                        if (!knownIds[list[j].id]) {
                            newOnes.push(list[j]);
                            knownIds[list[j].id] = true;
                        }
                    }

                    if (newOnes.length > 0) {
                        playNotificationSound();
                        showGlobalToast("🔔لديك إشعار جديد");
                    }
                }
            })
            .catch(function (err) {
                console.log("خطأ بفحص الإشعارات: " + err);
            });
    }

    // نأخد الحالة الأساسية فوراً من أول ما تنفتح الصفحة (بدون تأخير)
    // هيك أي إشعار ينضاف بعد هيك، حتى لو بعد ثانية وحدة، بينحسب "جديد"
    checkNotifications();
    setInterval(checkNotifications, POLL_INTERVAL);
})();