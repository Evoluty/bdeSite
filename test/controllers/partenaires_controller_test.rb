require 'test_helper'

class PartenairesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

end
