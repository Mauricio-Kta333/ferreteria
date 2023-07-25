
var id = 0;

function create() {
	axios.post('/categorias/', {
		nombre: txtNombre.value,
		codigo: txtCodigo.value,

	}).then(function (response) {
		console.log(response);
		clear();
		read();
	})

		.catch(function (error) {
			let data = ""
			Object.values(error.response.data.errors).forEach(element => {
				data += `<p>${element}</p>`;
			});
			errores.innerHTML = data;
		});
}

function read(url = "categorias") {
	axios
		.get(url)
		.then(function (response) {
			console.log(response.data.links);
			let datos = '';
			let lista = '';
			response.data.data.forEach((element, index) => {
				datos += `<tr onclick='load(${JSON.stringify(element)})'>`;
				datos += `<td>${index + 1}</td>`;
				datos += `<td>${element.nombre}</td>`;
				datos += `<td>${element.codigo}</td>`;
				datos += `<td>${element.estado}</td>`;
				datos += `</tr>`;
			});
			response.data.links.forEach(element => {
				lista += `<td>
						<a class="pagina" onclick="read('${element.url}')">${element.label}</a>
				</td>`
			});
			tableBody.innerHTML = datos;
			list.innerHTML = lista;
		})
		.catch(function (error) {
			console.log(error);
		});

}

function load(element) {
	this.id = element.id
	txtNombre.value = element.nombre;
	txtCodigo.value = element.codigo;
}

function update() {
	axios
		.put('/categorias/' + this.id, {
			id: this.id,
			nombre: txtNombre.value,
			codigo: txtCodigo.value,

		}).then(function (response) {
			console.log(response);
			clear();
			read();
		})
		.catch(function (error) {
			console.log(error);
		})
}

function deletes() {
	let respuesta = confirm("¿Esta seguro de eliminar la categoria?");
	if (respuesta) {
		axios.delete('/categorias/' + id)
		.then(function (response) {
			console.log(response);
			read();
			clear()
			
		})
		.catch(function (error) {
			console.log(error);
		});
	}
}

function clear() {
	txtNombre.value = "";
	txtCodigo.value = "";
}

read()