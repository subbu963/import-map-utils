const defaultOptions = {
    useLocation: true,
    base: null,
    assetsRoot: '/',
};
export default async function(url) {
    const { origin, pathname, searchParams } = new URL(url);
    const src = searchParams.get('src');
    const options = {...defaultOptions, ...(window.__importMapUtils?.css || {})};
    let base = `${origin}${pathname}`;
    if(options.base) {
        base = options.base;
    } else if(options.useLocation) {
        base = `${window.location.origin}${options.assetsRoot}`;
    }
    const resolvedUrl = new URL(src, base).href;
    let css = '';
    const res = {
        resolved: false,
        mounted: false,
    };
    try {
        css = await fetch(resolvedUrl).then(r => r.ok ? r.text() : Promise.reject());
        res.resolved = true;
    } catch (error) {
        throw `CSS: Unable to fetch - ${resolvedUrl}`;
    }
    const stylesheet = document.createElement('style');
    stylesheet.type = 'text/css';
    const mount = () => {
        stylesheet.innerText = css;
        document.head.appendChild(stylesheet);
        console.log(`CSS: Mounted - ${resolvedUrl}`);
        res.mounted = true;
    };
    const unmount = () => {
        stylesheet.remove();
        console.log(`CSS: Unmounted - ${resolvedUrl}`);
        res.mounted = false;
    };
    if(res.resolved) {
        mount();
    }
    return Object.assign(res, {
        mount,
        unmount,
    });
}