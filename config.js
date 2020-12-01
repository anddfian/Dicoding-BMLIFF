function loadAbsen() 
{
    if(localStorage.list_data && localStorage.id_data) 
	{
        list_data = JSON.parse(localStorage.getItem('list_data'));
        var data_app = "";
        if(list_data.length > 0) 
		{
            data_app = '<table class="table table-striped table-dark">';
            data_app += '<thead>' +
                '<th>ID</th>' +
                '<th>Nama</th>' +
                '<th>Jabatan</th>' +
                '<th>Waktu</th>' +
                '</thead> <tbody>';

            for(i in list_data) 
			{
                data_app += '<tr>';
                data_app +=
                    '<td>' + list_data[i].id_data + ' </td>' +
                    '<td>' + list_data[i].nama + ' </td>' +
                    '<td>' + list_data[i].jabatan + ' </td>' +
                    '<td>' + list_data[i].waktu + ' </td>';
                data_app += '</tr>';
            }

            data_app += '</tbody></table>';

        }
        else 
		{
            data_app = "Absen belum terisi";
        }


        $('#daftar-absen').html(data_app);
        $('#daftar-absen').hide();
        $('#daftar-absen').fadeIn(100);
    }
}

function simpanData() 
{
	liff.sendMessages([{
		'type': 'text',
		'text': "Terima kasih! Anda telah mengisi Absen."
	}]).then(function() {
		alert('Absen berhasil');
	}).catch(function(error) {
		alert('Terdapat kesalahan, silahkan coba lagi...');
	});

    nama = $('#nama').val();
    waktu = $('#waktu').val();
    jabatan = $('#jabatan').val();

    if(localStorage.list_data && localStorage.id_data) 
	{
        list_data = JSON.parse(localStorage.getItem('list_data'));
        id_data = parseInt(localStorage.getItem('id_data'));
    }
    else 
	{
        list_data = [];
        id_data = 0;
    }

    id_data++;
    list_data.push({ 'id_data': id_data, 'nama': nama, 'jabatan': jabatan, 'waktu': waktu });
    localStorage.setItem('list_data', JSON.stringify(list_data));
    localStorage.setItem('id_data', id_data);
    document.getElementById('form-data').reset();
    gantiMenu('daftar-absen');

    return false;
}

function gantiMenu(menu) 
{
    if(menu == "daftar-absen") 
	{
        loadAbsen();
        $('#tambah-absen').hide();
        $('#daftar-absen').fadeIn();
    }
    else if(menu == "tambah-absen") 
	{
		if(liff.isLoggedIn())
		{
			$('#tambah-absen').fadeIn();
			$('#daftar-absen').hide();
		}
		else
		{
            sendAlertIfNotInLoggedAbsen();
		}
    }
}