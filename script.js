    const viewer = document.getElementById("viewer");
    const infoTitle = document.getElementById("infoTitle");
    const infoContent = document.getElementById("infoContent");
    const infoPanel = document.getElementById("infoPanel");
    const hotspotList = document.getElementById("hotspotList");

    const hotspots = [
      { title: 'Cơ cổ', content: 'Cơ cổ có vị trí rất dễ xác định, nằm ngay ở phần cổ của mỗi người. Nhóm cơ này có diện tích khá nhỏ và thường bị bỏ quên trong quá trình tập luyện. Cơ cổ được tạo nên các nhóm cơ nhỏ như: Sternohyoid, Omohyoid, Thyrohyoid và Sternothyroid.', target: '-0.001m 0.006m -0.000m', orbit: '0deg 90deg 0.5m', fov: '20deg' },
      { title: 'Cơ vai', content: 'Cơ vai thuộc một trong những nhóm cơ đặc biệt quan trọng trên cơ thể, nằm ở 2 phía bên vai của chúng ta. Cơ vai bao gồm 3 nhóm cơ nhỏ như: cơ vai ngoài hay cơ vai giữa (Lateral fibers) - phần cơ to và khoẻ nhất trong nhóm cơ vai, cơ vai sau (Posterior fibers) và cơ vai trước (Anterior fibers). ', target: '-0.004m 0.004m -0.000m', orbit: '0deg 80deg 0.45m', fov: '20deg' },
      { title: 'Cơ ngực', content: 'Nhóm cơ này nằm ở ngay phần ngực của chúng ta và có hai nhóm nằm đối xứng ở hai bên. Mỗi bên của nhóm cơ ngực lại bao gồm cơ ngực trên và cơ ngực dưới.', target: '-0.001m 0.004m 0.001m', orbit: '0deg 70deg 0.5m', fov: '20deg' },
      { title: 'Cơ bụng', content: 'Cơ bụng bao gồm hai nhóm chính như sau: Cơ múi bụng (six pack): Còn được gọi là cơ 6 múi vì khi tập luyện đúng cách đa phần sẽ cho kết quả 6 múi săn chắc - thân hình lý tưởng của rất nhiều chàng trai. Trường hợp khác sẽ cho đến tận 8 múi, bao gồm 6 múi nhỏ ở trên (Rectus Abdominis) và 2 múi dài ở dưới (Tendinous Inscriptions). Cơ liên sườn: Là hai nhóm cơ dọc nằm ngay hai bên sườn, tạo thành một vòm ôm lấy các múi bụng phía trong. Cơ liên sườn bao gồm Serratus Anterior (nhóm nhỏ hơn nằm phía ngoài) và External Oblique (nhóm cơ lớn hơn nằm phía trong gần múi bụng).', target: '-0.000m -0.001m 0.001m', orbit: '0deg 60deg 0.6m', fov: '22deg' },
      { title: 'Cơ cẳng tay', content: 'Nhóm cẳng tay (Forearms) là phần cơ đặc biệt quan trọng trên cơ thể con người, có tác động rất lớn đến các hoạt động thể chất và sinh hoạt thường ngày. Cơ cẳng tay trải dài từ cẳng tay kéo dài đến gan bàn tay, chi phối các hoạt động ở chi tay của chúng ta. Nhóm cơ cẳng tay bao gồm các nhóm cơ như: Brachioradialis (nằm ở phía trong nhóm tay, trong lòng bàn tay); Flexor Carpi Ulnaris (nằm ở ngón tay út) và cuối cùng là Extensor Carpi Ulnaris (nằm ở phía đối diện 2 nhóm cơ trên).', target: '-0.005m -0.001m -0.001m', orbit: '10deg 65deg 0.6m', fov: '22deg' },
      { title: 'Cơ đùi', content: 'Nhóm cẳng tay (Forearms) là phần cơ đặc biệt quan trọng trên cơ thể con người, có tác động rất lớn đến các hoạt động thể chất và sinh hoạt thường ngày. Cơ cẳng tay trải dài từ cẳng tay kéo dài đến gan bàn tay, chi phối các hoạt động ở chi tay của chúng ta. Nhóm cơ cẳng tay bao gồm các nhóm cơ như: Brachioradialis (nằm ở phía trong nhóm tay, trong lòng bàn tay); Flexor Carpi Ulnaris (nằm ở ngón tay út) và cuối cùng là Extensor Carpi Ulnaris (nằm ở phía đối diện 2 nhóm cơ trên).', target: '-0.002m -0.006m 0.001m', orbit: '0deg 50deg 0.7m', fov: '25deg' },
      { title: 'Cơ bắp chuối', content: 'Cơ đùi cũng là nhóm cơ to khỏe nhất của cơ thể, được đặc biệt coi trọng trong tập luyện.', target: '-0.002m -0.012m -0.002m', orbit: '0deg 45deg 0.7m', fov: '25deg' },
    ];

    let currentHotspot = null;

   function toggleHotspot(index) {
  if (currentHotspot === index) {
    closePanel();
    currentHotspot = null;
    loadHotspotList(null);
  } else {
    const hs = hotspots[index];
    infoTitle.innerText = hs.title;
    infoContent.innerText = hs.content;
    infoPanel.classList.add("active");

    viewer.cameraTarget = hs.target;

    // Phân tích orbit ban đầu để chỉnh khoảng cách
    const [azimuth, elevation, distance] = hs.orbit.split(' ');
    // Giảm khoảng cách để zoom gần hơn (vd: giảm 40%)
    const newDistance = (parseFloat(distance) * 0.6) + 'm';
    viewer.cameraOrbit = `${azimuth} ${elevation} ${newDistance}`;
    
    // Giảm fieldOfView 1 cách hợp lý
    const fovNumber = parseFloat(hs.fov);
    viewer.fieldOfView = (fovNumber * 0.75) + 'deg';

    viewer.jumpCameraToGoal();

    // Cập nhật hotspot active, hiển thị info...
    document.querySelectorAll('.hotspot').forEach(h => h.classList.remove('active-hotspot'));
    const hotspotElement = document.querySelector(`[slot="hotspot-${index + 1}"]`);
    if (hotspotElement) {
      hotspotElement.classList.add("active-hotspot");
    }

    currentHotspot = index;
    loadHotspotList(index);
  }
}



    function closePanel() {
      infoPanel.classList.remove("active");
    }

    function nextHotspot() {
      const nextIndex = currentHotspot !== null ? (currentHotspot + 1) % hotspots.length : 0;
      toggleHotspot(nextIndex);
    }

    function prevHotspot() {
      const prevIndex = currentHotspot !== null ? (currentHotspot - 1 + hotspots.length) % hotspots.length : hotspots.length - 1;
      toggleHotspot(prevIndex);
    }

    function loadHotspotList(index) {
  hotspotList.innerHTML = ""; // Xóa nội dung cũ

  if (index !== null && index >= 0 && index < hotspots.length) {
    const hs = hotspots[index];
    const btn = document.createElement('button');
    btn.className = 'hotspot-button active';
    btn.innerText = hs.title;
    btn.onclick = () => toggleHotspot(index);
    hotspotList.appendChild(btn);
  }
}





    document.getElementById("customARBtn").addEventListener("click", () => {
      if (viewer.activateAR) {
        viewer.activateAR();
      } else {
        alert("Thiết bị không hỗ trợ AR hoặc model-viewer chưa sẵn sàng.");
      }
    });

    loadHotspotList();
