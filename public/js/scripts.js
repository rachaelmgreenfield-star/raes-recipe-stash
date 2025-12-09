const canWakeLock = () => "wakeLock" in navigator;
let wakelock;

document.getElementById("on-switch").addEventListener("change", async (e) => {
  if (!canWakeLock()) {
    e.target.checked = false;
    return;
  }

  if (e.target.checked == false) {
    if (wakelock) wakelock.release();
    wakelock = null;
    return;
  }

  try {
    wakelock = await navigator.wakeLock.request();
  } catch (e) {
    console.error("Failed to lock wake state with reason:", e.message);
  }
});
