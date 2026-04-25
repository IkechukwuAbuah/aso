// app.jsx — Aṣọ main app shell. Routes between screens, holds cart state.

const { useState: uAS, useEffect: uAE } = React;

function AsoApp() {
  const [route, setRoute] = uAS({ name: 'onboarding' });
  const [location, setLocation] = uAS({ state: 'lagos', city: 'Lekki' });
  const [cart, setCart] = uAS([
    { fabricId: 'f1', qty: 1 },
    { fabricId: 'f12', qty: 2 },
  ]);
  const [tab, setTab] = uAS('home');

  const goto = (name, params = {}) => {
    if (name === 'home') setTab('home');
    if (name === 'search') setTab('search');
    if (name === 'orders') setTab('orders');
    if (name === 'cart') setTab('cart');
    if (name === 'profile') setTab('profile');
    setRoute({ name, ...params });
  };
  const onAddCart = ({ fabricId, qty, custom }) => {
    setCart(c => [...c, { fabricId, qty, custom }]);
    setRoute({ name: 'cart' });
    setTab('cart');
  };

  // Tab switch
  const handleTab = (t) => {
    setTab(t);
    setRoute({ name: t });
  };

  const showTabs = ['home', 'search', 'orders', 'cart', 'profile'].includes(route.name);
  const cartCount = cart.length;

  let content;
  switch (route.name) {
    case 'onboarding': content = <OnboardingScreen onContinue={() => goto('location')} />; break;
    case 'location':   content = <LocationScreen onPick={(loc) => { setLocation(loc); goto('home'); }} onBack={() => goto('onboarding')} />; break;
    case 'home':       content = <HomeScreen location={location} cart={cart} goto={goto} onAddCart={onAddCart} />; break;
    case 'search':     content = <SearchScreen initialFilters={route} location={location} goto={goto} onAddCart={onAddCart} />; break;
    case 'vendor':     content = <VendorScreen vendorId={route.id} goto={goto} onAddCart={onAddCart} cart={cart} />; break;
    case 'fabric':     content = <FabricScreen fabricId={route.id} goto={goto} onAddCart={onAddCart} />; break;
    case 'cart':       content = <CartScreen cart={cart} setCart={setCart} goto={goto} />; break;
    case 'checkout':   content = <CheckoutScreen cart={cart} location={location} goto={goto} onPlace={() => { setCart([]); goto('success'); }} />; break;
    case 'success':    content = <OrderSuccessScreen goto={goto} />; break;
    case 'orders':     content = <OrdersScreen goto={goto} />; break;
    case 'profile':    content = <ProfileScreen location={location} />; break;
    case 'designer':   content = <DesignerScreen initialFabricId={route.fabricId} goto={goto} onAddCart={onAddCart} />; break;
    default:           content = <HomeScreen location={location} cart={cart} goto={goto} onAddCart={onAddCart} />;
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>{content}</div>
      {showTabs && <TabBar active={tab} onChange={handleTab} cartCount={cartCount} />}
    </div>
  );
}

// Helper: spawn an app fixed on a particular screen for the design canvas
function AsoAppFixed({ initial, withTabs = true, location = { state: 'lagos', city: 'Lekki' } }) {
  const [route, setRoute] = uAS(initial);
  const [cart, setCart] = uAS([{ fabricId: 'f1', qty: 1 }, { fabricId: 'f12', qty: 2 }]);
  const goto = (name, params = {}) => setRoute({ name, ...params });
  const onAddCart = ({ fabricId, qty, custom }) => { setCart(c => [...c, { fabricId, qty, custom }]); goto('cart'); };

  let content;
  switch (route.name) {
    case 'onboarding': content = <OnboardingScreen onContinue={() => goto('location')} />; break;
    case 'location':   content = <LocationScreen onPick={() => goto('home')} onBack={() => goto('onboarding')} />; break;
    case 'home':       content = <HomeScreen location={location} cart={cart} goto={goto} onAddCart={onAddCart} />; break;
    case 'search':     content = <SearchScreen initialFilters={route} location={location} goto={goto} onAddCart={onAddCart} />; break;
    case 'vendor':     content = <VendorScreen vendorId={route.id} goto={goto} onAddCart={onAddCart} cart={cart} />; break;
    case 'fabric':     content = <FabricScreen fabricId={route.id} goto={goto} onAddCart={onAddCart} />; break;
    case 'cart':       content = <CartScreen cart={cart} setCart={setCart} goto={goto} />; break;
    case 'checkout':   content = <CheckoutScreen cart={cart} location={location} goto={goto} onPlace={() => goto('success')} />; break;
    case 'success':    content = <OrderSuccessScreen goto={goto} />; break;
    case 'orders':     content = <OrdersScreen goto={goto} />; break;
    case 'profile':    content = <ProfileScreen location={location} />; break;
    case 'designer':   content = <DesignerScreen initialFabricId={route.fabricId} goto={goto} onAddCart={onAddCart} />; break;
  }
  const showTabs = withTabs && ['home', 'search', 'orders', 'cart', 'profile'].includes(route.name);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>{content}</div>
      {showTabs && <TabBar active={route.name} onChange={(t) => goto(t)} cartCount={cart.length} />}
    </div>
  );
}

Object.assign(window, { AsoApp, AsoAppFixed });
