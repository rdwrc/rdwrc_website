guard 'shell' do
  watch(/stylesheets\/scss\/(.*).scss/) do |match|
    `sass stylesheets/scss/application.scss stylesheets/application.css`
  end
end
