$(function() {
    // const id = uuidv4();
    const id = 'd6492eda-ca31-4ba7-bbad-30e353623068'
    var deviceName = "23.Painter"
    var ecEndpoint = 'https://iottalk2.tw/csm'

    function on_signal(cmd, param) {
        console.info('[cmd]', cmd, param);
        return true;
    }

    function on_data(idf_name, data) {
        console.info('[data]', idf_name, data);
    }

    function init_callback(result) {
        console.info('register:', result);
        $('#pageTitle').text(result ? 'Connected' : 'Registration failed');
    }

    function register(deviceName) {
        if (dan2.connected()) {
          return;
        }
    
        dan2.register(
              ecEndpoint, {
                'id': id,
                'name': deviceName,
                'on_signal': on_signal,
                'on_data': on_data,
                'idf_list': [
                  'Pic-I', 'Next-I', 'Previous-I'
                ],
                'odf_list': [
                  'Pic-O',
                ],
                'profile': {
                  'model': 'Painter',
                },
                'accept_protos': ['mqtt', ],
              },
              init_callback);
    }
      
    // Register
    register(deviceName);

});