desc 'Start Jekyll server and watch Sass/Bourbon files'
task :server do
  puts "Starting the Jekyll server and watching Sass files."
  jekyllPid = Process.spawn('jekyll serve -w --trace')
  guardPid = Process.spawn('bundle exec guard --no-interactions')

  trap("INT") {
    [jekyllPid, guardPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [jekyllPid, guardPid].each { |pid| Process.wait(pid) }
end
