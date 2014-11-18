VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
#  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.network "forwarded_port", guest: 1337, host: 1337
  config.vm.synced_folder "app/", "/app"

  config.vm.provision "docker" do |docker|
  	docker.pull_images "redis"
  	docker.pull_images "mongo"

  	docker.run "redis", daemonize: true, args: "-p 6379:6379"
  	docker.run "mongo", daemoize: true, args: "-p 27017:27017"

#  	docker.build_image "/app", args: "-t app"
#  	docker.run "app", args: "--link redis:redis --link mongo:mongo -p 1337:1337 -v `pwd`/app:/app", daemonize: true
  end
  config.vm.provision :shell, path: "bootstrap.sh"
#  config.vm.provision :shell, path: "startup.sh", run: "always", privileged: false
end