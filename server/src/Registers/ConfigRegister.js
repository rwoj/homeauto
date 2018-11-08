async function getKonfig(){
    const konfig = await r.table('konfig').orderBy('id').run()
    const konfigTemp = await r.table('konfigTemp').orderBy('id').run()
    return {konfig, konfigTemp}
  }    