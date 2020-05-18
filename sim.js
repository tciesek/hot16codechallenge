var app = new PIXI.Application(640, 360); document.body.appendChild(app.view);
let [coronas, ttl] = [[], 200];
const spread = origin => {
    const corona = PIXI.Sprite.from(`assets/coronavirus-${Math.floor(Math.random() * 3)}.png`);
    [corona.x, corona.y, corona.ttl] = [origin.x + Math.random() * 256 - 128, origin.y + Math.random() * 256 - 128, ttl];
    coronas.push(corona);
    app.stage.addChild(corona);
}
spread({ x: app.screen.width / 2 - 32, y: app.screen.height / 2 - 32 });
app.ticker.add(() => {
    const rFactor = document.getElementById("rFactor").value;
    coronas.forEach(corona => { corona.ttl -= 1; Array(spreadAmount(rFactor/ttl)).fill().forEach(() => spread(corona)); });
    coronas.filter(corona => corona.ttl < 0).forEach(corona => app.stage.removeChild(corona));
    coronas = coronas.filter(corona => corona.ttl >= 0);
});
const spreadAmount = rPerTick => Math.floor(rPerTick) + (Math.random() < (rPerTick - Math.floor(rPerTick)) ? 1 : 0);