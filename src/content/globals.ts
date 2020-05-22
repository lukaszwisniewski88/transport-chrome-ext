export const addPreviewPortal = () => {
  // Remove any exisiting portals
  const existingPortal = document.querySelector('portal')
  if (existingPortal) {
    existingPortal.remove()
  }

  // Adding some styles with transitions
  const style = document.createElement('style')
  style.innerHTML = `
    portal {
        position:fixed;
        width: 100%;
        height: 100%;
        opacity: 0;
        box-shadow: 0 0 20px 10px #999;
        transform: scale(0.4);
        transform-origin: bottom left;
        bottom: 20px;
        left: 20px;
        animation-name: fade-in;
        animation-duration: 1s;
        animation-delay: 2s;
        animation-fill-mode:forwards;
    }
    .portal-transition {
        transition: transform 0.4s;
    }
    @media (prefers-reduced-motion: reduce) {
        .portal-transition {
            transition: transform 0.001s;
        }
    }
    .portal-reveal {
        transform: scale(1.0) translateX(-20px) translateY(20px);
    }
    @keyframes fade-in {
        0%   { opacity: 0; }
        100% { opacity: 1; }
    }`
  const portal = document.createElement('portal') as any
  // Let's navigate into the WICG Portals spec page
  portal.src =
    'https://www.google.com/maps/dir/14-100+Ostr%C3%B3da/Herten,+Niemcy/@52.2821801,11.4045749,7z/data=!4m14!4m13!1m5!1m1!1s0x471d64bfb8f59205:0xc821ee4f812cc8cc!2m2!1d19.9647952!2d53.6963007!1m5!1m1!1s0x47b8e4f395c333b7:0x97b8a37a9fe6a70d!2m2!1d7.1389575!2d51.6020534!3e0'
  // Add a class that defines the transition. Consider using
  // `prefers-reduced-motion` media query to control the animation.
  // https://developers.google.com/web/updates/2019/03/prefers-reduced-motion
  portal.classList.add('portal-transition')
  portal.addEventListener('click', () => {
    // Animate the portal once user interacts
    window.open(portal.src)
  })
  portal.addEventListener('transitionend', (evt: any) => {
    if (evt.propertyName === 'transform') {
      // Activate the portal once the transition has completed
      portal.activate()
    }
  })
  document.body.append(style, portal)
}
