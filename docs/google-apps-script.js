// ============================================
// Google Apps Script — Brief Nicola Nania
// ============================================
// Este script recibe los datos del formulario,
// guarda las imágenes en Google Drive y
// agrega una fila en Google Sheets.
//
// INSTRUCCIONES DE INSTALACIÓN:
//
// 1. Ve a https://sheets.google.com y crea un nuevo Google Sheet
// 2. Ponle de nombre "Briefs Nicola Nania" (o como prefieras)
// 3. En la primera fila (encabezados), escribe estos títulos en cada columna:
//    A: Fecha | B: Empresa | C: Sector | D: Tienen Logo | E: Dominio
//    F: Objetivo | G: Secciones | H: Funcionalidades | I: Colores
//    J: Estilo | K: Fotos | L: Contenido | M: Fecha Entrega
//    N: Responsable | O: Referencia 1 | P: Referencia 2
//    Q: Lo que gusta de refs | R: Ref Logo (texto) | S: Imágenes (links)
//
// 4. Ve a Extensiones > Apps Script
// 5. Borra el código que aparece y pega TODO este archivo
// 6. Haz clic en "Implementar" > "Nueva implementación"
// 7. Tipo: "Aplicación web"
//    - Ejecutar como: "Yo" (tu cuenta)
//    - Acceso: "Cualquier persona"
// 8. Clic en "Implementar" y copia la URL que te da
// 9. Pega esa URL en index.html donde dice SHEETS_ENDPOINT
//
// ============================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Guardar imágenes en Drive si existen
    var imageLinks = [];
    if (data.imagenesLogo && data.imagenesLogo.length > 0) {
      var folder = getOrCreateFolder('Briefs - Imágenes Logo');
      var empresa = data.empresa || 'sin-nombre';

      for (var i = 0; i < data.imagenesLogo.length; i++) {
        var base64 = data.imagenesLogo[i];
        var match = base64.match(/^data:image\/(png|jpeg|webp);base64,(.+)$/);
        if (match) {
          var ext = match[1] === 'jpeg' ? 'jpg' : match[1];
          var bytes = Utilities.base64Decode(match[2]);
          var blob = Utilities.newBlob(bytes, 'image/' + match[1], empresa + '-ref-' + (i + 1) + '.' + ext);
          var file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          imageLinks.push(file.getUrl());
        }
      }
    }

    // Agregar fila al sheet
    sheet.appendRow([
      new Date(),             // Fecha
      data.empresa,           // Empresa
      data.sector,            // Sector
      data.tienenLogo,        // Tienen Logo
      data.dominio,           // Dominio
      data.objetivo,          // Objetivo
      data.secciones,         // Secciones
      data.funcionalidades,   // Funcionalidades
      data.colores,           // Colores
      data.estilo,            // Estilo
      data.fotos,             // Fotos
      data.contenido,         // Contenido
      data.fechaEntrega,      // Fecha Entrega
      data.responsable,       // Responsable
      data.referencia1,       // Referencia 1
      data.referencia2,       // Referencia 2
      data.gustaWebs,         // Lo que gusta
      data.refLogo,           // Ref Logo texto
      imageLinks.join('\n'),  // Links de imágenes
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(name);
}
